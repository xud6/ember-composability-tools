import Component from '@ember/component';
import ParentMixin from '@ember-paper-lite/ember-composability-tools/mixins/parent';

export default Component.extend(ParentMixin, {
  tagName: '',
  didInsertParent() {
    this._super(...arguments);
    console.log('didInsertParent - parent'); // eslint-disable-line
  },

  willDestroyParent() {
    this._super(...arguments);
    console.log('willDestroyParent - parent'); // eslint-disable-line
  },
});
