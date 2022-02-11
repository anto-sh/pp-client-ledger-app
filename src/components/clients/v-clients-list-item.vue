<template>
  <li class="c-clients-list__item" @click="toClientPage">
    <p class="c-client-li__name">Прозвище: {{ client_data.name }}</p>
    <p class="c-client-li__tel">Телефония: {{ client_data.tel }}</p>
    <p class="c-client-li__orders-amount">Сумма заказов: {{ client_finance_data.orders_amount }} грошей</p>
    <p class="c-client-li__discount-size">Скидка {{ client_finance_data.discount_size }} %</p>
  </li>
</template>


<script>

export default {
  name: 'v-clients-list-item',
  data() {
    return {}
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
      if (!this.client_orders.length) return {orders_amount: 0, discount_size: 0};
      let amountAccumulatorRule = (amount, order) => {
        return amount + +order.cost;
      };
      let discountBreakpointFindRule = function (breakpoint_data, index, array) {
        return breakpoint_data.orders_amount <= ordersAmount;
      };

      let ordersAmount = this.client_orders.reduce(amountAccumulatorRule, 0);
      let discountBreakpointIndex = this.discount_breakpoints.findIndex(discountBreakpointFindRule);

      if (discountBreakpointIndex === -1) {
        return {orders_amount: ordersAmount, discount_size: 0};
      } else {
        return {
          orders_amount: ordersAmount,
          discount_size: this.discount_breakpoints[discountBreakpointIndex].discount_size
        };
      }
    }
  },
  methods: {
    toClientPage() {
      this.$router.push({
        name: 'client',
        params: {
          'client_data': this.client_data,
          "client_orders": this.client_orders,
          "client_finance_data": this.client_finance_data
        },
        query: {'id': this.client_data.id}
      })
    },
  },
}
</script>