<template>
  <div class="step-one">
    <div class="px-4 py-4 justify-content-center">
      <div class="">
        <div class="d-flex justify-content-between my-2">
          <div style="margin-top: 5px;" class="me-5">
            <label for="sort_by">Sort By:</label>
            <select :value="sortBy"
                    @change="$emit('update:sortBy', $event.target.value)" id="sort_by" class="input ml-2">
              <option disabled value="">None</option>
              <option value="topic">Subject</option>
              <option value="location">Location</option>
              <option value="price">Price</option>
              <option value="spaces">Spaces</option>
            </select>

            <div style="margin-top: 15px;">
              <label for="sort_order">Sort Order:</label>
              <select :value="sortOrder"
                      @change="$emit('update:sortOrder', $event.target.value)" id="sort_order" class="input ml-2">
                <option disabled value="">None</option>
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>


          <div style="margin-top: 20px;" class="mb-4">
            <label for="search">Search:</label>
            <input
                   @input="$emit('update:search', $event.target.value)" id="search" type="search" name="search" class=" input ml-2" />
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center border-bottom mt-5 py-2">
          <div class="col-4">Subject</div>
          <div class="col-2 justify-content-end ml-auto">Location</div>
          <div class="col-2">Price</div>
          <div class="col-2">Spaces</div>
          <div class="col-2"></div>
        </div>
        <div v-if="!isLoading">
          <div  style="display: inline-block; padding: 30px 0px 30px; border-bottom: 1px solid rgb(235, 227, 227);" v-for="(lesson, index) in getLessons()"
                :key="index"
                class="d-flex justify-content-between">
            <div class="col-4 d-flex ">
              <p> <img style="height: 50px; width: 50px;" :alt="lesson.topic" :src="getImageUrl(lesson.image)"/></p>
              <p style="margin-left: 20px;">
                <template v-for="(fragment, i) in lesson.topic.toString().split(new RegExp(`(?<=${search})|(?=${search})`, 'i'))">
                  <mark v-if="fragment.toLowerCase() === search.toLowerCase()" :key="i" class="text-warning">
                    {{ fragment }}
                  </mark>
                  <template v-else>{{ fragment }}</template>
                </template>
              </p>
            </div>
            <div class="col-2 justify-content-end ml-auto">
              <template v-for="(fragment, i) in lesson.location.toString().split(new RegExp(`(?<=${search})|(?=${search})`, 'i'))">
                <mark v-if="fragment.toLowerCase() === search.toLowerCase()" :key="i" class="text-warning">
                  {{ fragment }}
                </mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </div>
            <div class="col-2 ">
              <p>${{lesson.price}}</p>
            </div>
            <div class="col-2">
              <p class="mx-4">{{lesson.spaces}}</p>
            </div>
            <div class="col-2 text-center">
              <button type="button" :disabled="!canAddToCart(lesson)" v-on:click="$emit('add-to-cart', lesson)" class="rounded-2 btn btn-info p-3 text-white" style="border-radius: 6px; cursor: pointer;">
                <span class="fas fa-cart-plus"></span>
                Add to cart
              </button>
            </div>


          </div>
        </div>
        <div v-else class="d-flex mt-5 justify-content-center">
          <div class="lds-dual-ring justify-content-center align-items-center "></div>
        </div>
      </div>

      <div class="d-flex justify-content-center ml-auto mb-3 fixed-bottom" >
        <button type="button" :disabled="cartItemCount < 1" v-on:click="showCheckout" class="btn btn-info p-3 rounded-2 text-white"  style="border-radius: 6px;  cursor: pointer;">
          {{cartItemCount}}
          <span class="fas fa-shopping-cart"></span>
          View Cart
        </button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'lessons-component',
  data(){
    return {

    }
  },
  props: {
    sortBy: {type: String, required: true},
    sortOrder: {type: String, required: true},
    cartItemCount: {type: Number, required: true},
    getLessons: {type: Function, required: true},
    search: {type: String, required: true},
    getImageUrl: {type: Function, required: true},
    showCheckout: {type: Function, required: true},
    canAddToCart: {type: Function, required: true},
    isLoading: {type: Boolean, required: true},
  },
  methods: {

  }
}
</script>

<style>

</style>
