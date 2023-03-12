import ElementUI from "element-ui";

export function Toast(
  message,
  type = "success",
  dangerouslyUseHTMLString = true
) {
  ElementUI.Notification({
    message,
    type,
    dangerouslyUseHTMLString,
    duration: 3000,
  });
}

export function Message(message, type = "success") {
  ElementUI.Message({
    message,
    type,
  });
}

export function resetObj(obj) {
  for (const key in obj) {
    obj[key] = "";
  }
}
