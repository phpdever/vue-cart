/*develop shoping cart function*/
vm = new Vue({
	el:".container",
	data:{
		productList:[],
		checkAllFlag:false
	},
	filters:{
		formatMoney:function(val,type){
			return '￥' + val.toFixed(2) + type;
		}
	},
	mounted:function(){
		this.cartView();
	},
	methods:{
		cartView:function(){
			var _this = this;
			this.$http.get('data/cart.json',{'id':1}).then(function(res){
				_this.productList = res.body.result.productList;
			});
		},
		//动态修改商品数量、价格
		changeMoney:function(item,way){
			if(way > 0){
				item.productQuentity++;
			}else{
				item.productQuentity--;
				if(item.productQuentity < 1){
					item.productQuentity = 1;
				}
			}
		},
		//选中商品
		selectedProduct:function(item){
			if(typeof item.checked == 'undefined'){
				this.$set(item,'checked',true);
			}else{
				item.checked = !item.checked;
			}
		},
		//全选商品列表
		checkAll:function(flag){
			this.checkAllFlag = flag;
			var _this = this;
			this.productList.forEach(function(item,index){
			    if(typeof item.checked == 'undefined'){
			      _this.$set(item,'checked',_this.checkAllFlag);
			    }else{
			      item.checked = _this.checkAllFlag;
			    }
			});
		}
	}
});
//全局过滤器
Vue.filter('Money',function(val,type){
	return '￥' + val.toFixed(2) + type;
});