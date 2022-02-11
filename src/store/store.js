import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'


Vue.use(Vuex)

let root_url = "http://localhost:3000/"

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
            const removeIndex = state.orders.findIndex(order => order.id === order_id);
            state.orders.splice(removeIndex, 1);
        },
        DELETE_BUNCH_ORDERS_FROM_STORE(state, orders_ids) {
            orders_ids.forEach(id => {
                const removeIndex = state.orders.findIndex(order => order.id === id);
                state.orders.splice(removeIndex, 1);
                console.log("order #" + id + " was deleted");
            });
            return true;
        },
        UPDATE_ORDER_TO_STORE(state, order_data) {
            const order_index = state.orders.findIndex(order => order.id === order_data.id);
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
        DELETE_CLIENT_FROM_STORE(state, client_id) {
            const removeIndex = state.clients.findIndex(client => client.id === client_id);
            state.clients.splice(removeIndex, 1);
        },
        UPDATE_CLIENT_TO_STORE(state, client_data) {
            const client_index = state.clients.findIndex(client => client.id === client_data.id);
            state.clients[client_index] = client_data;
        },
        ADD_CLIENT_TO_STORE(state, client_data) {
            state.clients.push(client_data);
        },
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
                return axios.get(root_url + 'orders')
                    .then((response) => {
                        commit('SET_ORDERS_TO_STORE', response.data)
                    });
            }
        },
        DELETE_ORDER_FROM_DB({commit}, order_id) {
            axios.delete(root_url + 'orders/' + order_id)
                .then(() => {
                    commit('DELETE_ORDER_FROM_STORE', order_id);
                });
        },
        DELETE_BUNCH_ORDERS_FROM_DB({commit}, orders_ids) {
            orders_ids.forEach(async id => {
                await axios.delete(root_url + 'orders/' + id);
                if (id === orders_ids.at(-1)) {
                    commit("DELETE_BUNCH_ORDERS_FROM_STORE", orders_ids);
                }
            });
        },
        UPDATE_ORDER_TO_DB({commit}, order_data) {
            axios.put(root_url + 'orders/' + order_data.id, order_data)
                .then(() => {
                    commit("UPDATE_ORDER_TO_STORE", order_data);
                });
        },
        ADD_ORDER_TO_DB({commit}, order_data) {
            axios.post(root_url + 'orders/', order_data)
                .then(() => {
                    commit("ADD_ORDER_TO_STORE", order_data);
                });
        },

        //clients
        FETCH_CLIENTS({commit}) {
            if (this.state.clients.length) {
                return this.state.clients;
            } else {
                return axios.get(root_url + 'clients')
                    .then((response) => {
                        commit('SET_CLIENTS_TO_STORE', response.data)
                    });
            }
        },
        FETCH_DISCOUNT_BREAKPOINTS({commit}) {
            if (this.state.discount_breakpoints.length) {
                return this.state.discount_breakpoints;
            } else {
                return axios.get(root_url + 'discount_breakpoints')
                    .then((response) => {
                        commit('SET_DISCOUNT_BREAKPOINTS_TO_STORE', response.data)
                    });
            }
        },
        DELETE_CLIENT_FROM_DB({commit, dispatch}, client_id) {
            let orders_ids = [];
            this.state.orders.forEach(order => {
                if (order.client_id === client_id) orders_ids.push(order.id);
            });
            if (orders_ids.length) dispatch("DELETE_BUNCH_ORDERS_FROM_DB", orders_ids);
            axios.delete(root_url + 'clients/' + client_id)
                .then(() => {
                    commit('DELETE_CLIENT_FROM_STORE', client_id);
                    console.log("client #" + client_id + " was deleted")
                });
        },
        UPDATE_CLIENT_TO_DB({commit}, client_data) {
            axios.put(root_url + 'clients/' + client_data.id, client_data)
                .then(() => {
                    commit("UPDATE_CLIENT_TO_STORE", client_data);
                });
        },
        ADD_CLIENT_TO_DB({commit}, client_data) {
            axios.post(root_url + 'clients/', client_data)
                .then(() => {
                    commit("ADD_CLIENT_TO_STORE", client_data);
                });
        },
    },
    modules: {}
});
