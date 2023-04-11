import store from "@/store";
function hasPermission(value, el = false) {
  if (!Array.isArray(value)) {
    throw new Error(`需要配置权限，例如 v-permission="['/location/week']"`);
  }
  const hasAuth =
    value.findIndex((v) => store.state.user.userInfo.authorities.includes(v)) !=
    -1;

  if (el && !hasAuth) {
    el.parentNode && el.parentNode.removeChild(el);
  }
  return hasAuth;
}

export default {
  install(Vue) {
    Vue.directive("permission", {
      inserted(el, binding) {
        hasPermission(binding.value, el);
      },
    });
  },
};
