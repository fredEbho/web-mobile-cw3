<template>
  <div>
    <div  class="px-4 py-4 justify-content-center">

      <div class="d-flex justify-content-between align-items-center border-bottom mt-4 py-2" >
        <div class="col-4">Subject</div>
        <div class="col-2 justify-content-end ml-auto">Location:</div>
        <div class="col-2 ">Price</div>
        <div class="col-2">Quantity In Cart:</div>
        <div class="col-2"></div>
      </div>

      <div style="display: inline-block;" v-for="(lesson, index) in cart" :key="index"  class="d-flex justify-content-between mt-4">
        <div class="col-4 d-flex ">
          <p> <img style="height: 50px; width: 50px;" :alt="lesson.topic" :src="getImageUrl(lesson.image)" /></p> <p style="margin-left: 20px;">{{lesson.topic}} </p>
        </div>
        <div class="col-2 justify-content-end ml-auto ">
          <p>{{lesson.location}}</p>
        </div>

        <div class="col-2">
          <p>${{lesson.price}}</p>
        </div>

        <div class="col-2">
          <p>{{lesson.cart_quantity}}</p>
        </div>


        <div class="col-2 text-center ">
          <button v-on:click="$emit('remove-item-from-cart', lesson)"  class="border border-none  p-2 rounded-2 bg-info text-white" style="border-radius: 6px;  cursor: pointer; margin-left: -40px;">
            Remove
          </button>
        </div>
      </div>
    </div>

    <form @submit.prevent="submitOrder(order)" class="px-5 py-4 justify-content-center ">
      <div>
        <h2 style="font-size: 21px; margin-bottom: 15px;">Checkout</h2>
        <p >
          <label for="name"><strong>Name:</strong></label>
          <input id="name" v-model.trim="order.name" class="input ml-2" />
        </p>
        <p>
          <label for="phone"><strong>Phone:</strong></label>
          <input id="phone" v-model.trim="order.phone" class="input ml-2" />
        </p>

        <button :disabled="!canCheckout" type="submit" class="btn btn-info p-3 rounded-2 text-white mt-4" style="border-radius: 6px;">
          Checkout
        </button>
      </div>

      <div class="d-flex justify-content-center ml-auto mb-3 fixed-bottom" >
        <button :disabled="isLoading" v-on:click="showLessons" class="border border-none p-3 rounded-2 bg-info text-white" style="border-radius: 6px;  cursor: pointer;">
          <span class="fas fa-arrow-left"></span>
          {{isLoading ? 'Please wait...' : 'Back To Lessons'}}
        </button>
      </div>
    </form>
  </div>
</template>



<script>
export default {
  name: "checkout-component",
  data(){
    return {
      order: {
        name: '',
        phone: '',
      },
    }
  },
  props: {
    cart: {type: Array, required: true},
    submitOrder: {type: Function, required: true},
    getImageUrl: {type: Function, required: true},
    showLessons: {type: Function, required: true},
    isLoading: {type: Boolean, required: true},
  },
  computed: {
    canCheckout() {
      return !this.isLoading && this.order.name.length > 0 && this.order.phone.length > 0 && /^[a-zA-Z\s]*$/.test(this.order.name) && /^\d+$/.test(this.order.phone);
    }
  }
}
</script>

<style scoped>

</style>
