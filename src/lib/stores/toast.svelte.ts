export const toastState = $state<{ message: string; visible: boolean }>({ message: '', visible: false });

let timeout: ReturnType<typeof setTimeout>;

export function showToast(message: string, duration = 3000) {
  toastState.message = message;
  toastState.visible = true;
  clearTimeout(timeout);
  timeout = setTimeout(() => {
    toastState.visible = false;
  }, duration);
}
