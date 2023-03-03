<template>
<div>
  <fieldset
    id="dob"
    class="k__date__multi__fieldset"
    v-click-outside="handleClickOutside"
    :class="{'active': isDirty, 'valid': dateValid, 'error': (!dateValid && touched) || (!dateValid && isComplete) || isFuture || isTooOld || isNotLegalAge}"
    @click="focusInput">
    <label>{{placeholder}}</label>
    <div class="k__date__multi__group">
      <input
        id="month"
        type="tel"
        class="k__date__multi__input"
        placeholder="MM"
        v-model="month"
        ref="month"
        :data-neuro-attribute="dataNeuroAttribute"
        :data-nid-target="dataNeuroAttribute+ '_month'"
        :disabled="disabled"
        @focus="focus = true"
        @keypress="monthMask"
        @keyup.delete="mask($event,'month')">
      <span class="k__date__multi__slash"/>
      <input
        id="day"
        type="tel"
        class="k__date__multi__input"
        placeholder="DD"
        v-model="day"
        ref="day"
        :data-neuro-attribute="dataNeuroAttribute"
        :data-nid-target="dataNeuroAttribute+ '_day'"
        :disabled="disabled"
        @focus="focus = true"
        @keypress="dayMask"
        @keyup.delete="mask($event,'month')">
      <span class="k__date__multi__slash"/>
      <input
        id="year"
        type="tel"
        class="k__date__multi__input --year"
        placeholder="YYYY"
        v-model="year"
        ref="year"
        :data-neuro-attribute="dataNeuroAttribute"
        :data-nid-target="dataNeuroAttribute+ '_year'"
        :disabled="disabled"
        @focus="focus = true"
        @keypress="yearMask"
        @keyup.delete="mask($event,'day')">
    </div>
  </fieldset>
    <span class="k__date__multi__error" v-if="isFuture && isComplete">
      {{ futureDateError }}
    </span>
    <span class="k__date__multi__error" v-else-if="isTooOld && isComplete">
      {{ oldDateError }}
    </span>
    <span class="k__date__multi__error" v-else-if="isNotLegalAge && isComplete">
      {{ legalAgeError }}
    </span>
    <span class="k__date__multi__error" v-else-if="(!dateValid && isComplete) || (!dateValid && touched)">
      {{ inValidDateError }}
    </span>
</div>
</template>

<script src="./DateMulti.js"></script>
<style lang="scss" scoped src="./DateMulti.scss"></style>
