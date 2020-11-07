import {POP, NEW, SELL} from "./const";

import { debounce } from "./utils"
export const itemListenerMixin ={
  data(){
    return {
         itemImgListener:null,
         newRefresh:null
    }
  },
  mounted() {
  this.newRefresh = debounce(this.$refs.scroll.refresh, 100);
    this.itemImgListener = () => {
      // console.log('d')
        this.newRefresh()
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

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      // console.log(this.currentType);
    }
  }
}