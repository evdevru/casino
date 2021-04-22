<template>
  <div class="crash">
    <div ref="crashWrapper" class="crash__wrapper">
      <ul class="crash__lines">
        <li
          v-for="(number, idx) in numbers"
          :key="`crash-line-${idx}`"
          class="crash__line"
        >
          {{ number }}
        </li>
      </ul>
      <div v-show="rate > 1" class="crash__rate">
        <div class="crash__ticker" :style="{ bottom: `${percent / 2}%` }">
          <svg class="crash__background">
            <use xlink:href="/img/icon/free/sprite.svg#crash-label"></use>
          </svg>
          <div class="crash__ticker--count">
            {{ rate }}
          </div>
        </div>
      </div>
      <div ref="crashChartContainer" class="crash__chart">
        <div v-show="timeleft > 0 && isActive" class="crash__countdown">
          <span class="w-full text-center crash__start-at">Запуск через</span>
          <span class="flex items-center"
            ><svg class="w-6 h-5 mr-2">
              <use :xlink:href="`/img/icon/free/sprite.svg#clock`"></use></svg
            >{{ (timeleft / 1000).toFixed(1) }}</span
          >
        </div>
        <svg
          ref="crashSvg"
          class="crash__svg"
          xmlns="http://www.w3.org/2000/svg"
          :viewBox="`0 0 ${crashChartContainerWidth} ${chartHeight}`"
          :width="chartWrapperWidth"
          :height="chartHeight"
        >
          <defs>
            <linearGradient id="header-shape-gradient" x2="0" y2="1">
              <stop offset="0%" stop-color="#ffb200" />
              <stop offset="40%" stop-color="#ffb200" />
              <stop offset="100%" stop-color="#ffffff" />
            </linearGradient>
          </defs>
          <path
            stroke="#ffb200"
            stroke-width="4px"
            fill="url(#header-shape-gradient) transparent"
            stroke-linecap="round"
            :d="pathD"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  props: {
    socket: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      maxLines: 4,
      timeleft: 0,
      interval: null,
      loaded: false,
      isActive: true,
      hidden: null,
      visibilityChange: null,
    }
  },
  computed: {
    ...mapState({
      rate: (state) => state.crash.rate,
    }),
    pathD() {
      const width = this.crashChartContainerWidth
      const height = this.chartHeight
      const offset = 8
      const width1 = width / 3
      const height1 = height / 2

      const x0y0 = `M ${offset},${height - offset}`
      const x1y1 = `${width1},${height1}`
      const x2y2 = `${width1 * 2},${height1}`
      const x3y3 = `${width - offset},${height - offset}`

      const q1 = `Q ${(width1 / 3) * 2},${height - height1 / 3}`
      const q2 = `Q ${width / 2},0`
      const q3 = `Q ${width1 * 2 + width1 / 3},${height - height1 / 3}`

      return `${x0y0} ${q1} ${x1y1} ${q2} ${x2y2} ${q3} ${x3y3}`
    },
    percent() {
      const res = this.rate * 100 - 100
      return res >= 100 ? 100 : res
    },
    crashChartContainerWidth() {
      if (!this.loaded) {
        return 0
      }
      return this.$refs.crashChartContainer.clientWidth - 30
    },
    chartWrapperHeight() {
      if (!this.loaded) {
        return 0
      }
      return (this.$refs.crashWrapper.clientHeight / 3) * 2
    },
    chartWrapperWidth() {
      if (!this.loaded) {
        return 0
      }
      return this.$refs.crashWrapper.clientWidth
    },
    chartHeight() {
      const height = parseFloat(
        (this.rate * 100 - 100) * (this.chartWrapperHeight / 100)
      )
      return height < 30 || !this.isActive
        ? 30
        : height >= this.chartWrapperHeight
        ? this.chartWrapperHeight - 2
        : height - 2
    },
    endRange() {
      return this.rate * 1.5
    },
    numbers() {
      const rangeHalf = this.endRange / this.maxLines
      const result = [1]

      for (let i = 0; i < this.maxLines - 2; i++) {
        const num = parseFloat((result[i] + rangeHalf).toFixed(2))
        result.push(num)
      }

      result.push(this.endRange)

      return result
        .sort((a, b) => a + b)
        .map((number) => {
          const chanks = number.toString().split('.')
          return `${chanks[0]}.${
            chanks.length > 1 ? chanks[1].split('')[0] : 0
          }0`
        })
    },
  },
  beforeMount() {
    window.addEventListener('resize', this.handleResize)
    this.socket
      .on('game:status', (data) => {
        if (data.timeleft > 0) {
          this.timeleft = data.timeleft
          this.startCountDown()
        }
      })
      .on('game:new', (data) => {
        this.SET_RATE(1)
        this.timeleft = data.timeleft
        clearInterval(this.interval)
        this.startCountDown()
      })
      .on('game:tick', (data) => {
        if (this.isActive) this.SET_RATE(data.rate)
      })
      .on('game:final', (data) => {})

    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      this.hidden = 'hidden'
      this.visibilityChange = 'visibilitychange'
    } else if (typeof document.msHidden !== 'undefined') {
      this.hidden = 'msHidden'
      this.visibilityChange = 'msvisibilitychange'
    } else if (typeof document.webkitHidden !== 'undefined') {
      this.hidden = 'webkitHidden'
      this.visibilityChange = 'webkitvisibilitychange'
    }

    this.$nextTick(() => {
      window.addEventListener(this.visibilityChange, this.setActive, false)
    })
  },
  mounted() {
    this.loaded = true
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener(this.visibilityChange, this.setActive)

    clearInterval(this.interval)
  },
  methods: {
    ...mapMutations({
      SET_RATE: 'crash/SET_RATE',
    }),
    setActive() {
      this.isActive = !document[this.hidden]
    },
    startCountDown() {
      if (!this.isActive) {
        this.timeleft = 0
      }
      this.interval = setInterval(() => {
        if (this.timeleft <= 0) {
          return clearInterval(this.interval)
        }
        this.timeleft -= 100
      }, 100)
    },
    handleResize() {
      this.loaded = false
      setTimeout(() => {
        this.loaded = true
      }, 1)
    },
  },
}
</script>

<style lang="scss">
.crash {
  &__wrapper {
    overflow: hidden;
    position: relative;
  }

  &__lines {
    display: grid;
    gap: 1.5rem;
    font-weight: 500;
    width: 40px;
    font-size: 12px;

    @screen sm {
      gap: 2.5rem;
    }

    @screen md {
      gap: 4.5rem;
    }

    @screen xl {
      gap: 6.5rem;
    }
  }

  &__line {
    text-align: right;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      right: -10px;
      top: 50%;
      transform: translateY(-50%) translateX(100%);
      border-top: 1px dashed rgb(227, 226, 223);
      width: 100vw;
    }
  }

  &__countdown {
    font-weight: 700;
    font-size: 16px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;

    @screen md {
      font-size: 20px;
    }

    @screen lg {
      font-size: 24px;
    }
  }

  &__start-at {
    font-size: 16px;
    font-weight: 600;

    @screen md {
      font-size: 18px;
    }

    @screen lg {
      font-size: 20px;
    }
  }

  &__rate {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: grid;
    gap: 0.5rem;
    font-weight: 600;
    font-size: 20px;
  }

  &__background {
    transition: all 0.3s linear;
    stroke: #ffb200;
    width: 75px;
    height: 25px;

    @screen md {
      width: 85px;
      height: 40px;
    }
  }

  &__ticker {
    position: absolute;
    left: 0;
    transform: translateY(50%);
    font-weight: 600;
    font-size: 10px;

    @screen md {
      font-size: 14px;
    }

    &:after {
      content: '';
      position: absolute;
      right: 3px;
      top: 50%;
      transform: translate(100%, -50%);
      width: 100vw;
      border-top: 1.5px dashed rgba(227, 226, 223, 0.85);
      z-index: -1;
    }

    &--count {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-55%, -50%);
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      height: 100%;
      //background-color: white;
      border-radius: 8px;
    }
  }

  &__chart {
    position: absolute;
    bottom: 50%;
    right: 0;
    transform: translate(0, 50%);
    width: calc(100% - 50px);
    height: 100%;
    display: flex;
    align-items: flex-end;
  }

  &__svg {
  }
}
</style>
