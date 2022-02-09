<template>
  <li class="c-clients-list__item">
    <p class="c-client-li__name">{{ client_data.name }}</p>
    <p class="c-client-li__orders-amount">{{ client_finance_data.orders_amount }}</p>
    <p class="c-client-li__discount-size">{{ client_finance_data.discount_size }}</p>
    <button class="c-client-li__btn--delete">Удалить</button>
  </li>
</template>


<script>

export default {
  name: 'v-clients-list-item',
  data() {
    return {
    }
  },
  props: {
    client_data: {
      type: Object,
      default: () => {
        return {};
      },
    },
    client_orders: {
      type: Array,
      default: () => {
        return [];
      }
    },
    discount_breakpoints: {
      type: Array,
      default: () => {
        return [];
      }
    },

  },
  computed: {
    client_finance_data: function () {
      if(!this.client_orders.length) return {orders_amount: 0, discount_size: 0};
      let amountAccumulatorRule = (amount, order) => {
        return amount + +order.cost;
      };
      let discountBreakpointFindRule = function(breakpoint_data, index, array) {
        return breakpoint_data.orders_amount <= ordersAmount;
      };

      let ordersAmount = this.client_orders.reduce(amountAccumulatorRule, 0);
      let discountBreakpointIndex = this.discount_breakpoints.slice().reverse().findIndex(discountBreakpointFindRule);

      if(discountBreakpointIndex === -1) {
        return {orders_amount: ordersAmount, discount_size: 0};
      } else {
        return {orders_amount: ordersAmount, discount_size: this.discount_breakpoints[discountBreakpointIndex].discount_size};
      }
    }
  },
  methods: {
    // toClientPage() {
    //   this.$router.push({
    //     name: 'client',
    //     params: { 'client_data': this.client_data },
    //     query: { 'id': this.order_data.id }
    //   })
    // },
    // deleteClient() {
    //   this.DELETE_ORDER_FROM_DB(this.order_data.id);
    // },
  },
}
</script>