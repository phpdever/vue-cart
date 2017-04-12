/*develop shoping cart function*/
vm = new Vue({
	el:".container",
	data:{
		productList:[]
	},
	filters:{
		formatMoney:function(val){
			return '￥' + val.toFixed(2);
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
		}
	}
});