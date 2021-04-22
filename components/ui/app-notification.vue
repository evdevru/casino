<template>
  <notificationGroup group="default">
    <div
      class="fixed inset-0 z-50 flex items-end justify-start p-6 pointer-events-none"
    >
      <div class="max-w-full">
        <notification v-slot="{ notifications }">
          <div v-for="notification in notifications" :key="notification.id">
            <div
              v-if="notification.type === 'error'"
              class="flex mt-4 overflow-hidden bg-red-500 shadow-md rounded-xl"
            >
              <div class="p-3">
                <p class="font-semibold text-white text-md">
                  {{ notification.text }}
                </p>
              </div>
            </div>
            <div
              v-if="notification.type === 'success'"
              class="flex mt-4 overflow-hidden bg-green-500 shadow-md rounded-xl"
            >
              <div class="p-3">
                <p class="font-semibold text-white text-md">
                  {{ notification.text }}
                </p>
              </div>
            </div>
          </div>
        </notification>
      </div>
    </div>
  </notificationGroup>
</template>

<script>
export default {}
</script>

<style></style>
