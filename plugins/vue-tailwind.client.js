import Vue from 'vue'
import VueTailwind from 'vue-tailwind'

import {
  TDropdown,
  TButton,
  TInput,
  TModal,
  TCheckbox,
  TTable,
} from 'vue-tailwind/dist/components'

const settings = {
  // Use the following syntax
  // {component-name}: {
  //   component: {importedComponentObject},
  //   props: {
  //     {propToOverride}: {newDefaultValue}
  //     {propToOverride2}: {newDefaultValue2}
  //   }
  // }
  't-checkbox': {
    component: TCheckbox,
    props: {
      fixedClasses:
        'transition duration-300 ease-in-out rounded shadow-sm focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed',
      classes: 'text-primary border-gray-300 ',
      variants: {
        error: 'text-red-500 border-red-300',
        success: 'text-green-500 border-green-300',
      },
    },
  },
  't-modal': {
    component: TModal,
    props: {
      fixedClasses: {
        overlay:
          'z-40 overflow-auto scrolling-touch left-0 top-0 bottom-0 right-0 w-full h-full fixed bg-opacity-50',
        wrapper: 'relative mx-auto z-50 max-w-lg px-3 py-12',
        modal: 'overflow-visible relative rounded-xl bg-cream shadow p-12',
        body: '',
        header: 'text-2xl font-black text-center uppercase mb-6',
        footer: ' p-3 rounded-b',
        close:
          'flex items-center opacity-30 hover:opacity-100 justify-center absolute right-4 top-4 h-8 w-8 transition duration-100 ease-in-out focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50',
        closeIcon: 'fill-current h-full w-full',
      },
      classes: {
        overlay: 'bg-black',
        footer: 'bg-gray-100',
        overlayEnterClass: 'opacity-0',
        overlayEnterActiveClass: 'transition ease-out duration-100',
        overlayEnterToClass: 'opacity-100',
        overlayLeaveClass: 'opacity-100',
        overlayLeaveActiveClass: 'transition ease-in duration-75',
        overlayLeaveToClass: 'opacity-0',
        enterClass: '',
        enterActiveClass: '',
        enterToClass: '',
        leaveClass: '',
        leaveActiveClass: '',
        leaveToClass: '',
      },
      variants: {
        danger: {
          overlay: 'bg-red-100',
          header: 'border-red-50 text-red-700',
          close:
            'bg-red-50 text-red-700 hover:bg-red-200 border-red-100 border',
          modal: 'bg-white border border-red-100 shadow-lg',
          footer: 'bg-red-50',
        },
      },
    },
  },
  't-dropdown': {
    component: TDropdown,
    props: {
      fixedClasses: {
        button:
          'flex min-h-primary items-center text-black block p-2.5 transition duration-300 ease-in-out border border-transparent rounded focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed',
        wrapper: 'inline-flex flex-col',
        dropdownWrapper: 'relative z-10',
        dropdown:
          'origin-top-left absolute left-0 w-32 rounded shadow-primary mt-1',
        enterClass: 'opacity-0 scale-95',
        enterActiveClass: 'transition transform ease-out duration-300',
        enterToClass: 'opacity-100 scale-100',
        leaveClass: 'opacity-100 scale-100',
        leaveActiveClass: 'transition transform ease-in duration-75',
        leaveToClass: 'opacity-0 scale-95',
      },
      classes: {
        button: 'bg-white',
        dropdown: 'bg-white',
      },
      variants: {
        danger: {
          button: 'bg-red-500 hover:bg-red-600',
          dropdown: 'bg-red-50',
        },
      },
    },
  },
  't-button': {
    component: TButton,
    props: {
      fixedClasses:
        'block border px-4 py-2 border-transparent placeholder-opacity-5 rounded transition duration-400 ease-in-out focus:border-primary focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400',
      classes: 'text-white border border-transparent rounded font-bold',
      variants: {
        primary:
          'min-h-primary text-dark bg-primary uppercase font-bold text-xs hover:bg-primary-hover',
        link: 'min-h-primary text-primary underline hover:text-blue-600',
        white:
          'min-h-primary text-dark bg-white uppercase font-bold text-xs hover:bg-primary-hover',
        strong: 'uppercase font-bold text-xs',
        outline:
          'px-2 leading-none border-gray-200 text-dark bg-white text-sm rounded border-1 border-gray-300 hover:bg-primary hover:border-primary font-semibold',
      },
    },
  },
  't-input': {
    component: TInput,
    props: {
      fixedClasses:
        'block w-full px-6 py-3 placeholder-gray-400 transition duration-100 ease-in-out border rounded shadow-xs focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed min-h-8',
      classes:
        'text-black font-semibold text-lg bg-white border-gray-300 focus:border-primary ',
      variants: {
        danger: 'border-red-300 bg-red-50 placeholder-red-200 text-red-900',
        success: 'border-green-300 bg-green-50 text-green-900',
        strong: 'text-md font-normal placeholder-gray-400',
      },
    },
  },
  't-table': {
    component: TTable,
    props: {
      classes: {
        table:
          'min-w-full divide-y divide-gray-100 shadow-sm border-gray-200 border',
        thead: '',
        theadTr: '',
        theadTh: 'px-3 py-2 font-semibold text-left bg-gray-100 border-b',
        tbody: 'bg-white divide-y divide-gray-100',
        tr: '',
        td: 'px-3 py-2 whitespace-no-wrap',
        tfoot: '',
        tfootTr: '',
        tfootTd: '',
      },
      variants: {
        thin: {
          td: 'p-1 whitespace-no-wrap text-sm',
          theadTh: 'p-1 font-semibold text-left bg-gray-100 border-b text-sm',
        },
      },
    },
  },
}

Vue.use(VueTailwind, settings)
