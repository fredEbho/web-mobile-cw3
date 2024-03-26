<template>
  <header>
    <p></p>
  <div class="text-center" style="font-size: 25px; margin-bottom: 50px;" v-text="sitename"></div>
  </header>
  <main>
    <p></p>
    <div v-if="step === 1" class="step-one">
      <LessonsComponent v-on:add-to-cart="addToCart" :can-add-to-cart="canAddToCart" :cart-item-count="cartItemCount" :show-checkout="showCheckout" :get-image-url="getImageUrl" :is-loading="isLoading" :get-lessons="getLessons" :search-lessons="fetchLessons" v-model:sort-by="sort_by" v-model:sort-order="sort_order"  />
    </div>

    <div v-if="step === 2">
     <CheckoutComponent v-on:remove-item-from-cart="removeFromCart" :get-image-url="getImageUrl" :is-loading="isLoading" :cart="cart" :show-lessons="showLessons" :submit-order="submitOrder" />
    </div>

  </main>
</template>

<script>


import LessonsComponent from "@/components/Lessons.vue";
import CheckoutComponent from "@/components/CheckOut.vue";

export default {
  name: 'App',
  components: {
    CheckoutComponent,
    LessonsComponent
  },
  data() {
    let base_url = 'https://web-mobile-cw2.onrender.com';
    return {
      currentView: LessonsComponent,
      isLoading: false,
      step: 1,
      lessons: [],
      sort_by: 'topic',
      sort_order: 'asc',
      sitename: 'Books Store',
      cart: [],
      base_url,
      image_base_url: `${base_url}/public`
    }
  },
  mounted(){
    this.fetchLessons()
  },
  methods: {
    fetchLessons(){
      this.isLoading = true;
      let endpoint = search.length > 0 ? 'search?q='+search : 'lessons'
      fetch(`${this.base_url}/${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then(response => response.json())
          .then(responseJSON => {
            this.lessons = responseJSON;
          })
          .catch((error) => {
            console.log(error)
          }).finally( () => this.isLoading = false)
    },
    getImageUrl(image_path){
      return this.image_base_url+'/'+image_path
    },
    addToCart(lesson) {
      let item = this.cart.find(({ id }) => id === lesson.id);
      if (item) {
        item.cart_quantity += 1;
        item.spaces -= 1;
      }
      else {
        lesson.spaces -= 1;
        lesson.cart_quantity = 1;
        this.cart.push(lesson);
      }
    },
    showCheckout() {
      this.step = 2;
    },
    showLessons() {
      this.step = 1;
    },
    submitOrder(orderDetails) {
      this.isLoading = true;
      let lessonsInOrder = this.cart.map(item => ({id: item._id, topic: item.topic,location: item.location, numberOfSpaces: item.cart_quantity}));
      fetch(`${this.base_url}/order`, {
        method: 'POST', // set the HTTP method as 'POST'
        headers: {
          'Content-Type': 'application/json', // set the data type as JSON
        },
        body: JSON.stringify({...orderDetails,lessonsInOrder}), // need to stringify the JSON object
      })
          .then(response => response.json())
          .then(() => {
            //loop through all lessons bought and subtract the quantity bought
            this.cart.forEach((lesson) => {
              this.reduceLessonQuantity(lesson._id, lesson.cart_quantity);
            });
            alert("Order Submitted.");
            location.reload();
          })
          .catch((error) => {
            console.log(error)
          }).finally(() => this.isLoading = false)



    },
    reduceLessonQuantity(lessonId, reduceByQuantity){
      fetch(`${this.base_url}/lesson`, {
        method: 'PUT', // set the HTTP method as 'PUT'
        headers: {
          'Content-Type': 'application/json', // set the data type as JSON
        },
        body: JSON.stringify({lessonId: lessonId, reduceByQuantity: reduceByQuantity}), // need to stringify the JSON object
      })
    },
    canAddToCart(lesson) {
      return lesson.spaces > 0;
    },
    removeFromCart(lesson) {
      this.cart.splice(this.cart.indexOf(lesson), 1);
      let item = this.lessons.find(({ id }) => id === lesson.id);
      item.spaces = 5;
      item.cart_quantity = 0;
      if (this.cartItemCount < 1) {
        this.step = 1;
      }
    },
    getLessons(search = '') {
      let transformedLessons = [...this.lessons];

      if (this.sort_by === 'topic')
        transformedLessons.sort((a, b) => (a.topic > b.topic) ? this.sort_order === 'asc' ? 1 : -1 : this.sort_order === 'asc' ? -1 : 1);
      if (this.sort_by === 'location')
        transformedLessons.sort((a, b) => (a.location > b.location) ? this.sort_order === 'asc' ? 1 : -1 : this.sort_order === 'asc' ? -1 : 1);
      if (this.sort_by === 'price')
        transformedLessons.sort((a, b) => (a.price > b.price) ? this.sort_order === 'asc' ? 1 : -1 : this.sort_order === 'asc' ? -1 : 1);
      if (this.sort_by === 'spaces')
        transformedLessons.sort((a, b) => (a.spaces > b.spaces) ? this.sort_order === 'asc' ? 1 : -1 : this.sort_order === 'asc' ? -1 : 1);

      if (search.length > 1) {
        let e = search.toLowerCase();
        return transformedLessons.filter((lesson) => (lesson.topic.toLowerCase().indexOf(e) > -1 || lesson.location.toLowerCase().indexOf(e) > -1))
      }

      return transformedLessons;
    },

  },
  computed: {
    cartItemCount: function () {
      return this.cart.length;
    }
  }
}
</script>

<style>
.step-one {
  margin-top: 10px;

  height: 750px;
  overflow-y: scroll;
}

.input {
  border-radius: 8px;
  border: 1px solid var(--neutral-100, #E7EAEE);
  background: #FBFBFB;
  width: 200px;
  padding: 6px;
  outline: none!important;
  font-size: 13px;
}

label {
  margin-bottom: 10px;
  font-size: 14px;
}

main {
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
  background-color: white;
  width: 1000px;
  border-radius: 6px;
}


body {
  display: flex;
  justify-content: center;
  background-color: #f6f6f6;
  font-family: 'Lato', sans-serif;

}
.badge:after{
  content:attr(value);
  font-size:12px;
  color: #fff;
  background: red;
  border-radius:50%;
  padding: 0 5px;
  position:relative;
  left:-8px;
  top:-10px;
  opacity:0.9;
}
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ffffff;
  border-color: #000000 transparent #000000 transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
