import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import ParentMixin from './parent';

export default Mixin.create({
  // This is intended as an escape hatch, but ideally you would
  // `{{yield` a child contextual component with `parentComponent=this`
  parentComponent: computed({
    get() {
      if (this._parentComponent) {
        return this._parentComponent;
      }

      return this.nearestOfType(ParentMixin);
    },

    set(key, value) {
      return (this._parentComponent = value);
    },
  }),

  init() {
    this._super(...arguments);
    this.initParent?.();
    this.initChild?.();
  },

  initChild() {
    this.registerWithParent();
  },

  willDestroyElement() {
    this._super(...arguments);
    if (!this._isComposableDestroying) {
      this._isComposableDestroying = true;
      this.willDestroyElementParent?.();
      this.willDestroyElementChild?.();
    }
  },

  willDestroyElementChild() {
    this._super(...arguments);
    this.unregisterWithParent();
  },

  shouldRegister: true,

  shouldRegisterToParent(/*parentComponent*/) {
    return this.shouldRegister;
  },

  destroySelfAndChildren() {
    // We may be a child-parent. Destroy children if we can.
    this.destroyChildren?.();
    this.willDestroyParent?.();
    this._didInsert = false;
  },

  registerWithParent() {
    let parentComponent = this.parentComponent;
    if (parentComponent && this.shouldRegisterToParent(parentComponent)) {
      parentComponent.registerChild(this);
    }
  },

  unregisterWithParent() {
    let parentComponent = this.parentComponent;
    if (parentComponent) {
      parentComponent.unregisterChild(this);
    }
  },
});
