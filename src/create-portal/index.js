import Vue from 'vue';
import { VcInstance } from '../vc/index';
import { getUid } from '../utils/utils';

export default (defaultOptions = {}, wrapper) => {
	let isNeedWaiting = false;

	if (!defaultOptions.cName && !wrapper.name) {
		console.log('传送门：cName 必传');
		return;
	}

	if (!wrapper) {
		console.log('传送门：目标组件必传');
		return;
	}
	

	class Statics {
		static init(userOptions = {}) {
			let options = { ...VcInstance.config.CreatePortal, ...defaultOptions, ...userOptions };

			return new Promise((resolve, reject) => {
				// init options
				// ['v-transfer-dom']
				const { 
					el, 
					root: _root, 
					cName = wrapper.name,
					alive = false, // 再次调用，实例不销毁
					aliveEles, // 实例以外且该数组内的className, 点击不销毁
					leaveDelay = 0.3,
					autoDestory = true,
					getInstance, 
					onBefore, 
					store = VcInstance.config.store,
					router = VcInstance.config.router,
					parent = {}, // 依赖注入使用 like store, router, Life cycle，methods, mixins, ....
					data,
					components = {}, // 可以动态注入组件
					...rest
				} = options;

				let container = document.createElement(el || 'div');
				let target = document.querySelector(_root || 'body');

				let render = (res = {}) => {
					// destory
					!alive && VcInstance.APIS[cName] && VcInstance.APIS[cName].$emit('destory');

					let propsData = {
						...rest,
						data: res.data || data
					};

					// vm
					let vm;
					if (alive && VcInstance.APIS[cName]) {

						vm = VcInstance.APIS[cName];
						vm.$off(['destory', 'close', 'sure']);

						for (let key in propsData) {
							vm[key] = propsData[key];
						}

						// update
						let fn = vm.update || vm.loadData;
						fn && fn(options);
						
					} else {

						const VueComponent = Vue.extend({ 
							...wrapper, 
							components: { 
								...wrapper.components, 
								...components 
							} 
						});
						
						vm = new VueComponent({
							el: container,
							store, // vuex,
							router, // vue-router
							propsData,
							...parent,
							mounted() {
								alive && document.addEventListener('click', this.handleExtra, true);
							},
							destroyed() {
								alive && document.removeEventListener('click', this.handleExtra, true);
							},
							methods: {
								handleExtra(e) {
									try {
										let regex = new RegExp(`(${aliveEles.join('|')})`, 'g');
										if (
											!this.$el.contains(e.target) 
											&& !e.path.some(item => regex.test(item.className))
										) {
											this.$emit('destory');
										}
									} catch (e) {
										console.log(e);
									}
									
								}
							}
						});
					}
					
					// tag
					vm.__AUTO_DESTORY__ = autoDestory;

					vm.$on('destory', (res) => {
						vm.$destroy();
						// 主动卸载节点
						target.removeChild(vm.$el);
						delete VcInstance.APIS[cName];
					});

					const fn = (callback) => (res, opts = {}) => {

						const { 
							delay = leaveDelay, 
							destory = true 
						} = opts;
						
						// 考虑退出动画
						destory && setTimeout(() => vm.$emit('destory'), delay * 1000);

						callback(res);
					};

					vm.$on('close', fn(reject));

					vm.$on('sure', fn(resolve));

					// 回调vm实例
					getInstance && getInstance(vm);

					// 标记
					VcInstance.APIS[cName] = vm;

					// 插入	
					vm.$el.parentElement === null && target.appendChild(vm.$el);

					isNeedWaiting = false;
				};

				if (onBefore) {
					if (isNeedWaiting) {
						container = null;
						options = null;
						render = null;
					} else {
						isNeedWaiting = true;
						onBefore({ ...options })
							.then((res = {}) => {
								render(res);
							}).catch((res = {}) => {
								isNeedWaiting = false;
								reject(res);
							});
					}
					return;
				}
				render();
			});
		}

		/**
		 * 弹出项目，验证数据结构是否合法
		 * userOptions {
		 * 	store,
		 * 	router,
		 * 	getInstance,
		 * 	param: {
		 * 	}
		 * }
		 */
		static popup(userOptions = {}) {
			if (typeof userOptions !== 'object') {
				userOptions = {};
			}
			return Statics.init(userOptions);
		}
	}

	return Statics;
};


