declare module '@smallwei/avue' {
  const Avue: any;
  export default Avue;
}

declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module "*.json" {
  const value: any;
  export default value;
}

declare module 'vue/types/vue' {
  interface Vue {
    $util: object
  }
}

declare module 'qs' {
  const qs: any;
  export default qs;
}

// declare module 'element-ui' {
//   const elementUi: any;
//   export default elementUi;
// }

  declare module 'nprogress' {
    const nprogress: any;
    export default nprogress;
  }

declare module 'tinymce' {
  const tinymce: any;
  export default tinymce;
}
declare module 'mockjs' {
  const mockjs: any;
  export default mockjs;
}
