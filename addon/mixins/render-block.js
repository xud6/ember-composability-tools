import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { getOwner } from '@ember/application';
import layout from '../templates/render-block';

export default Mixin.create({
  layout,

  fastboot: computed(function () {
    let owner = getOwner(this);
    return owner.lookup('service:fastboot');
  }),
  isFastBoot: computed('fastboot', function () {
    if (this.fastboot) {
      if (this.fastboot.isFastBoot) {
        return true;
      }
    }
    return false;
  }),

  destinationElementTag: 'div',

  // creates a document fragment that will hold the DOM
  destinationElement: computed(function () {
    if (!this.isFastBoot) {
      return document.createElement(this.destinationElementTag);
    }
  }),
});
