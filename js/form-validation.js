/* Assignment #4 - Bootstrap validation feedback
   Applies the is-valid / is-invalid classes and shows the matching
   invalid-feedback / valid-feedback messages for every form marked
   with the "needs-validation" class. */

(function () {
  'use strict';

  var forms = document.querySelectorAll('form.needs-validation');

  function setState(field, state) {
    field.classList.toggle('is-valid', state === 'valid');
    field.classList.toggle('is-invalid', state === 'invalid');
  }

  function radioGroup(field) {
    if (field.type !== 'radio' || !field.name || !field.form) {
      return [field];
    }
    return Array.prototype.slice.call(field.form.elements[field.name]);
  }

  function isEmpty(field) {
    return field.type === 'checkbox' ? !field.checked : field.value.trim() === '';
  }

  /* data-error-required and data-error-invalid let a field show a precise
     message for the two different reasons why it can be invalid
     (for example "Email is required." vs "Please enter a valid email address."). */
  function refreshMessage(field, valid) {
    if (valid || !field.parentElement) {
      return;
    }
    var feedback = field.parentElement.querySelector('.invalid-feedback');
    if (!feedback) {
      return;
    }
    var message = isEmpty(field) ? field.dataset.errorRequired : field.dataset.errorInvalid;
    if (message) {
      feedback.textContent = message;
    }
  }

  function validateField(field) {
    /* Radio buttons are validated as one group: the constraint is satisfied
       as soon as any button of the group is checked. */
    if (field.type === 'radio') {
      var members = radioGroup(field);
      var valid = field.checkValidity();
      members.forEach(function (element) {
        setState(element, valid ? (element.checked ? 'valid' : 'neutral') : 'invalid');
      });
      refreshMessage(members[members.length - 1], valid);
      return valid;
    }

    var ok = field.checkValidity();

    /* Optional checkboxes simply stay neutral while they are unchecked. */
    if (field.type === 'checkbox' && !field.required) {
      setState(field, field.checked ? 'valid' : 'neutral');
      return ok;
    }

    /* Optional fields stay neutral until the user types something. */
    if (!field.required && isEmpty(field)) {
      setState(field, 'neutral');
      return true;
    }

    setState(field, ok ? 'valid' : 'invalid');
    refreshMessage(field, ok);
    return ok;
  }

  function validateForm(form) {
    var valid = true;
    Array.prototype.slice.call(form.elements).forEach(function (field) {
      if (['submit', 'reset', 'button', 'hidden'].indexOf(field.type) !== -1 || field.disabled) {
        return;
      }
      if (!validateField(field)) {
        valid = false;
      }
    });
    return valid;
  }

  function clearStates(form) {
    form.querySelectorAll('.is-valid, .is-invalid').forEach(function (field) {
      field.classList.remove('is-valid', 'is-invalid');
    });
  }

  /* Confirmation fields (for example "Confirm Password") point at the field
     they have to repeat through data-match="#id" and use setCustomValidity(). */
  document.querySelectorAll('[data-match]').forEach(function (field) {
    var target = document.querySelector(field.getAttribute('data-match'));
    if (!target) {
      return;
    }
    var sync = function () {
      field.setCustomValidity(field.value === target.value ? '' : 'Passwords do not match.');
    };
    field.addEventListener('input', sync);
    target.addEventListener('input', sync);
  });

  forms.forEach(function (form) {
    form.noValidate = true;

    /* The success alert is not part of the form itself - it sits right above
       the form inside the same card. */
    var alert = (form.closest('.card') || form).querySelector('[data-success-alert]');

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      var valid = validateForm(form);

      if (!valid) {
        if (alert) {
          alert.classList.add('d-none');
        }
        var firstInvalid = form.querySelector('.is-invalid');
        if (firstInvalid) {
          firstInvalid.focus();
        }
        return;
      }

      if (alert) {
        alert.classList.remove('d-none');
        alert.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      form.reset();
      clearStates(form);
    });

    form.addEventListener('reset', function () {
      window.setTimeout(function () {
        clearStates(form);
      }, 0);
    });

    form.querySelectorAll('input, select, textarea').forEach(function (field) {
      ['input', 'change', 'blur'].forEach(function (type) {
        field.addEventListener(type, function () {
          validateField(field);
        });
      });
    });
  });
})();
