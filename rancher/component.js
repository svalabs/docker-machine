"use strict";

define("nodes/components/driver-nutanix/component", ["exports", "shared/mixins/node-driver"], function (exports, _nodeDriver) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var LAYOUT = "PHNlY3Rpb24gY2xhc3M9Imhvcml6b250YWwtZm9ybSI+CiAgPGRpdiBjbGFzcz0iY29udGFpbmVyLWZsdWlkIj4KCiAgICB7eyEtLSBUaGlzIGxpbmUgc2hvd3MgdGhlIGRyaXZlciB0aXRsZSB3aGljaCB5b3UgZG9uJ3QgaGF2ZSB0byBjaGFuZ2UgaXQgLS19fQogICAgPGRpdiBjbGFzcz0ib3Zlci1ociI+PHNwYW4+e3tkcml2ZXJPcHRpb25zVGl0bGV9fTwvc3Bhbj48L2Rpdj4KCgogICAge3sjYWNjb3JkaW9uLWxpc3Qgc2hvd0V4cGFuZEFsbD1mYWxzZSBhcyB8IGFsIGV4cGFuZEZuIHwgfX0KICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSAKICAgICAgICB0aXRsZT0iMS4gQWNjb3VudCBBY2Nlc3MiCiAgICAgICAgZGV0YWlsPSJDb25maWd1cmUgdG8gY29ubmVjdCB0byB0aGUgTnV0YW5peCBQcmlzbSBFbGVtZW50IEluc3RhbmNlIgogICAgICAgIGV4cGFuZE9uSW5pdD10cnVlCiAgICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICAgIH19CgogICAgICA8ZGl2IGNsYXNzPSJyb3cgaW5saW5lLWZvcm0iPiAgICAgICAgCiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMiBjb2wtaW5saW5lIj4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5FbmRwb2ludDwvbGFiZWw+CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTAiPgogICAgICAgICAge3sgaW5wdXQgdHlwZT0idGV4dCIgY2xhc3M9ImZvcm0tY29udHJvbCIgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy5lbmRwb2ludCBwbGFjZWhvbGRlcj0iaXAvZnFkbjpwb3J0In19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBjbGFzcz0icm93IGlubGluZS1mb3JtIj4gICAgICAgIAogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+VXNlcm5hbWU8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEwIj4KICAgICAgICAgIHt7IGlucHV0IHR5cGU9InRleHQiIGNsYXNzPSJmb3JtLWNvbnRyb2wiIHZhbHVlPW1vZGVsLm51dGFuaXhDb25maWcudXNlcm5hbWUgcGxhY2Vob2xkZXI9InVzZXJuYW1lIn19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBjbGFzcz0icm93IGlubGluZS1mb3JtIj4gICAgICAgIAogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTIgY29sLWlubGluZSI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+UGFzc3dvcmQ8L2xhYmVsPgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTEwIj4KICAgICAgICAgIHt7IGlucHV0IHR5cGU9InBhc3N3b3JkIiBjbGFzcz0iZm9ybS1jb250cm9sIiB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnBhc3N3b3JkIHBsYWNlaG9sZGVyPSJwYXNzd29yZCJ9fQogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KCiAgICAgIDxkaXYgY2xhc3M9ImNvbC1zbS0xMiBjb2wtbWQtNCI+CiAgICAgICAgPHAgY2xhc3M9ImZvcm0tY29udHJvbC1zdGF0aWMgaGVscC1ibG9jayI+QWNjb3VudCBwcm92aWRlZCBuZWVkIHRvIGhhdmUgQ2x1c3RlciBBZG1pbiByb2xlPC9wPgogICAgICA8L2Rpdj4KCiAgICAgIHt7L2FjY29yZGlvbi1saXN0LWl0ZW19fQoKICAgICAge3sjYWNjb3JkaW9uLWxpc3QtaXRlbSAKICAgICAgICB0aXRsZT0iMi4gSW5zdGFuY2UgT3B0aW9ucyIKICAgICAgICBkZXRhaWw9IkNob29zZSB0aGUgc2l6ZSBhbmQgT1Mgb2YgdGhlIHZpcnR1YWwgbWFjaGluZSIKICAgICAgICBleHBhbmRPbkluaXQ9dHJ1ZQogICAgICAgIGV4cGFuZD0oYWN0aW9uIGV4cGFuZEZuKQogICAgICB9fQoKICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj52Q1BVKHMpPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICAgbWluPTEgCiAgICAgICAgICAgICBtYXg9MzIKICAgICAgICAgICAgIGNsYXNzPSJmb3JtLWNvbnRyb2wiIAogICAgICAgICAgICAgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bUNwdXMKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tNiI+CiAgICAgICAgICA8bGFiZWwgY2xhc3M9ImFjYy1sYWJlbCI+TnVtYmVyIE9mIENvcmVzIFBlciB2Q1BVPC9sYWJlbD4KICAgICAgICAgIHt7aW5wdXQtaW50ZWdlcgogICAgICAgICAgICBtaW49MQogICAgICAgICAgICBtYXg9OAogICAgICAgICAgICBjbGFzcz0iZm9ybS1jb250cm9sIgogICAgICAgICAgICB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnZtQ29yZXMKICAgICAgICAgIH19CiAgICAgICAgPC9kaXY+CiAgICAgIDwvZGl2PgoKICAgICAgPGRpdiBjbGFzcz0icm93Ij4KICAgICAgICA8ZGl2IGNsYXNzPSJjb2wgc3Bhbi02Ij4KICAgICAgICAgIDxsYWJlbCBjbGFzcz0iYWNjLWxhYmVsIj5NZW1vcnk8L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICB7e2lucHV0LWludGVnZXIgY2xhc3M9ImZvcm0tY29udHJvbCIgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy52bU1lbSB9fQogICAgICAgICAgICA8ZGl2IGNsYXNzPSJpbnB1dC1ncm91cC1hZGRvbiBiZy1kZWZhdWx0Ij5NaUI8L2Rpdj4KICAgICAgICAgIDwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICAgIDxkaXYgY2xhc3M9ImNvbCBzcGFuLTYiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkRpc2s8L2xhYmVsPgogICAgICAgICAgPGRpdiBjbGFzcz0iaW5wdXQtZ3JvdXAiPgogICAgICAgICAgICB7e2lucHV0LWludGVnZXIgY2xhc3M9ImZvcm0tY29udHJvbCIgdmFsdWU9bW9kZWwubnV0YW5peENvbmZpZy5kaXNrIH19CiAgICAgICAgICAgIDxkaXYgY2xhc3M9ImlucHV0LWdyb3VwLWFkZG9uIGJnLWRlZmF1bHQiPkdCPC9kaXY+CiAgICAgICAgICA8L2Rpdj4KCiAgICAgICAgPC9kaXY+CgogICAgICA8L2Rpdj4KCiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPkRpc2sgSW1hZ2U8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IiBjbGFzcz0iZm9ybS1jb250cm9sIiB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnZtSW1hZ2UgfX0KICAgICAgICAgIDxwIGNsYXNzPSJoZWxwLWJsb2NrIj4KICAgICAgICAgICAgTmFtZSBvZiB0aGUgdGVtcGxhdGUgdG8gdXNlIGZyb20gaW1hZ2UgbGlicmFyeQogICAgICAgICAgPC9wPgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KCiAgICAgIDxkaXYgY2xhc3M9InJvdyI+CiAgICAgICAgPGRpdiBjbGFzcz0iY29sIHNwYW4tMTIiPgogICAgICAgICAgPGxhYmVsIGNsYXNzPSJhY2MtbGFiZWwiPk5ldHdvcms8L2xhYmVsPgogICAgICAgICAge3tpbnB1dCB0eXBlPSJ0ZXh0IiBjbGFzcz0iZm9ybS1jb250cm9sIiB2YWx1ZT1tb2RlbC5udXRhbml4Q29uZmlnLnZtTmV0d29yayB9fQogICAgICAgICAgPHAgY2xhc3M9ImhlbHAtYmxvY2siPgogICAgICAgICAgICBOYW1lIG9mIHRoZSBuZXR3b3JrIHRvIGNvbm5lY3QgVk0gCiAgICAgICAgICA8L3A+CiAgICAgICAgICA8ZGl2PjwvZGl2PgogICAgICAgIDwvZGl2PgogICAgICA8L2Rpdj4KCgogICAgICB7ey9hY2NvcmRpb24tbGlzdC1pdGVtfX0KCgogICAge3svYWNjb3JkaW9uLWxpc3R9fQoKICAgIHt7IS0tIFRoaXMgZm9sbG93aW5nIGNvbnRhaW5zIHRoZSBOYW1lLCBMYWJlbHMgYW5kIEVuZ2luZSBPcHRpb25zIGZpZWxkcyAtLX19CiAgICA8ZGl2IGNsYXNzPSJvdmVyLWhyIj48c3Bhbj57e3RlbXBsYXRlT3B0aW9uc1RpdGxlfX08L3NwYW4+PC9kaXY+CgogICAge3tmb3JtLW5hbWUtZGVzY3JpcHRpb24KICAgICAgbW9kZWw9bW9kZWwKICAgICAgbmFtZVJlcXVpcmVkPXRydWUKICAgIH19CgogICAge3tmb3JtLXVzZXItbGFiZWxzCiAgICAgIGluaXRpYWxMYWJlbHM9bGFiZWxSZXNvdXJjZS5sYWJlbHMKICAgICAgc2V0TGFiZWxzPShhY3Rpb24gJ3NldExhYmVscycpCiAgICAgIGV4cGFuZEFsbD1leHBhbmRBbGwKICAgICAgZXhwYW5kPShhY3Rpb24gZXhwYW5kRm4pCiAgICB9fQoKICAgIHt7Zm9ybS1lbmdpbmUtb3B0cwogICAgICBtYWNoaW5lPW1vZGVsCiAgICAgIHNob3dFbmdpbmVVcmw9c2hvd0VuZ2luZVVybAogICAgfX0KCiAgICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyBlcnJvcnMgcHJvZHVjZWQgYnkgdmFsaWRhdGUoKSBpbiB0aGUgY29tcG9uZW50IC0tfX0KICAgIHt7dG9wLWVycm9ycyBlcnJvcnM9ZXJyb3JzfX0KCiAgICB7eyEtLSBUaGlzIGNvbXBvbmVudCBzaG93cyB0aGUgQ3JlYXRlIGFuZCBDYW5jZWwgYnV0dG9ucyAtLX19CiAgICB7e3NhdmUtY2FuY2VsIHNhdmU9InNhdmUiIGNhbmNlbD0oYWN0aW9uICJjYW5jZWwiKX19CiAgPC9kaXY+Cjwvc2VjdGlvbj4=";
  var computed = Ember.computed;
  var get = Ember.get;
  var set = Ember.set;
  var alias = Ember.computed.alias;
  var service = Ember.inject.service;
  var defaultRadix = 10;
  var defaultBase = 1024;
  exports.default = Ember.Component.extend(_nodeDriver.default, {
    driverName: 'nutanix',
    config: alias('model.nutanixConfig'),
    app: service(),
    init: function init() {
      var decodedLayout = window.atob(LAYOUT);
      var template = Ember.HTMLBars.compile(decodedLayout, {
        moduleName: 'nodes/components/driver-nutanix/template'
      });
      set(this, 'layout', template);

      this._super.apply(this, arguments);
    },
    bootstrap: function bootstrap() {
      var config = this.get('store').createRecord({
        type: 'nutanixConfig',
        username: "admin",
        vmCpus: 2,
        vmCores: 1,
        vmMem: 2048,
        vmImage: "CentOS-7-2009",
        vmNetwork: "default"
      });
      set(this, 'model.nutanixConfig', config);
    },
    validate: function validate() {
      this._super();

      var errors = get(this, 'errors') || [];

      if (!get(this, 'model.name')) {
        errors.push('Name is required');
      }

      if (parseInt(get(this, 'config.vmMem'), defaultRadix) < defaultBase) {
        errors.push('Memory Size must be at least 1024 MB');
      }

      if (get(errors, 'length')) {
        set(this, 'errors', errors);
        return false;
      } else {
        set(this, 'errors', null);
        return true;
      }
    }
  });
});;
"use strict";

define("ui/components/driver-nutanix/component", ["exports", "nodes/components/driver-nutanix/component"], function (exports, _component) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});