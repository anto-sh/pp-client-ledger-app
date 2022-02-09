import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        current_page: "",
        orders: [],
        clients: [],
        discount_breakpoints: [],
    },
    mutations: {
        //common
        SET_CURRENT_PAGE_TO_STORE(state, current_page) {
            state.current_page = current_page;
        },

        //orders
        SET_ORDERS_TO_STORE(state, orders) {
            state.orders = orders;
        },
        DELETE_ORDER_FROM_STORE(state, order_id) {
            const removeIndex = state.orders.findIndex(item => item.id === order_id);
            state.orders.splice(removeIndex, 1);
        },
        UPDATE_ORDER_TO_STORE(state, order_data) {
            let order_index = state.orders.findIndex(order => order.id === order_data.id);
            state.orders[order_index] = order_data;
        },
        ADD_ORDER_TO_STORE(state, order_data) {
            state.orders.push(order_data);
        },

        //clients
        SET_CLIENTS_TO_STORE(state, clients) {
            state.clients = clients;
        },
        SET_DISCOUNT_BREAKPOINTS_TO_STORE(state, discount_breakpoints) {
            state.discount_breakpoints = discount_breakpoints;
        },
        // SET_CLIENTS_FINANCE_DATA_TO_STORE(state, clients_finance_data) {
        //     state.clients_finance_data = clients_finance_data;
        // }
    },
    actions: {

        //common
        SET_CURRENT_PAGE({commit}, current_page) {
            if (current_page) {
                commit("SET_CURRENT_PAGE_TO_STORE", current_page);
            }
        },

        //orders
        FETCH_ORDERS({commit}) {
            if (this.state.orders.length) {
                return this.state.orders;
            } else {
                return axios.get('http://localhost:3000/orders')
                    .then((response) => {
                        commit('SET_ORDERS_TO_STORE', response.data)
                    });
            }
        },
        DELETE_ORDER_FROM_DB({commit}, order_id) {
            axios.delete('http://localhost:3000/orders/' + order_id)
                .then(() => {
                    commit('DELETE_ORDER_FROM_STORE', order_id);
                });
        },
        UPDATE_ORDER_TO_DB({commit}, order_data) {
            axios.put('http://localhost:3000/orders/' + order_data.id, order_data)
                .then(() => {
                    commit("UPDATE_ORDER_TO_STORE", order_data);
                });
        },
        ADD_ORDER_TO_DB({commit}, order_data) {
            axios.post('http://localhost:3000/orders/', order_data)
                .then(() => {
                    commit("ADD_ORDER_TO_STORE", order_data);
                });
        },

        //clients
        FETCH_CLIENTS({commit}) {
            if (this.state.clients.length) {
                return this.state.clients;
            } else {
                return axios.get('http://localhost:3000/clients')
                    .then((response) => {
                        commit('SET_CLIENTS_TO_STORE', response.data)
                    });
            }
        },
        FETCH_DISCOUNT_BREAKPOINTS({commit}) {
            if (this.state.discount_breakpoints.length) {
                return this.state.discount_breakpoints;
            } else {
                return axios.get('http://localhost:3000/discount_breakpoints')
                    .then((response) => {
                        commit('SET_DISCOUNT_BREAKPOINTS_TO_STORE', response.data)
                    });
            }
        },
        // FETCH_CLIENTS_FINANCE_DATA({commit}) {
        //     let clients_finance_data = [];
        //     for (const client of this.state.clients) {
        //         let client_id = client.id;
        //         let client_finance_obj = {
        //             id: client_id,
        //             orders_amount: 0,
        //             discount_size: 0
        //         };
        //         let ordersFilterRule = (order) => {
        //             order.client_id == client_id;
        //         };
        //         let amountAccumulatorRule = (amount, order) => {
        //             +amount + +order.cost;
        //         };
        //         let discountSizeFindRule = function (breakpoint_data, index, array) {
        //             return breakpoint_data.orders_amount >= ordersAmount;
        //         };
        //
        //         let curClientOrders = this.state.orders.filter(ordersFilterRule);
        //         if (curClientOrders.length === 0) clients_finance_data.push(client_finance_obj);
        //
        //         let ordersAmount = curClientOrders.reduce(amountAccumulatorRule);
        //         client_finance_obj.orders_amount = ordersAmount;
        //         if (ordersAmount < this.state.discount_breakpoints[0].orders_amount) {
        //             clients_finance_data.push(client_finance_obj);
        //         }
        //
        //         let discountSize = this.state.discount_breakpoints.find(discountSizeFindRule);
        //         if (discountSize) {
        //             client_finance_obj.discount_size = discountSize;
        //             clients_finance_data.push(client_finance_obj);
        //         }
        //     }
        //     commit("SET_CLIENTS_FINANCE_DATA_TO_STORE", clients_finance_data);
        // }
    },
    modules: {}
});
