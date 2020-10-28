import { debounce } from "./utils"
export const itemListenerMixin ={
  data(){
    return {
         itemImgListener:null
    }
  },
  mounted() {
    let newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
        newRefresh()
    }
    this.$bus.$on('itemImgOnload', this.itemImgListener)
  },
   
}

export const backTopMixin = {
  data(){
    return{
      isShowTop:false
    }
  },
  methods: {
    backTop: function () {
      this.$refs.scroll.scrollTo(0, 0, 300);
    }
  }

}