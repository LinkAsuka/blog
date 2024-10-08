# vuex使用





### 模块化使用

/store/modules/cart.js

```js
const state = {
	shopData: [{
		id: 1,
		img: 'https://img13.360buyimg.com/n7/jfs/t1/112239/37/30873/58108/63f5ad9eF08656d74/c01dc981be0e437f.jpg',
		title: '塔吊安全监控系统群塔防爆塔吊安全监控系统群塔防爆',
		desc: '通过人脸识别管理合法司 机，系统具有司机管理、通过人脸识别管理合法司 机，系统具有司机管理、',
		price: '10.01',
	}, ],
	carStr: '啦啦啦',
}

const mutations = {
	ADD_LIST: (state, one) => {
		state.shopData = [...state.shopData, one]
	},
}

const actions = {
	setList(context, data) {
		setTimeout(() => {
			console.log('111')
			context.commit('ADD_LIST', data)
		}, 1000)
	}
}

export default {
	namespaced: true,
	state,
	mutations,
	actions
}
```

/store/getters.js

```js
const getters = {
	carStr: state => state.cart.carStr
}
export default getters
```

### 辅助函数使用

```js
	import {
		mapState,
		mapMutations,
		mapActions
	} from 'vuex'
```

```js
		computed: {
			...mapState({
				shopData: state => state.cart.shopData,
			}),
			...mapState("cart", ["carStr"]),
		},
         methods: {
             ...mapMutations("cart", {
				addList: "ADD_LIST",
			}),
			...mapActions("cart", {
				setList: "setList",
			}),
         }
```

