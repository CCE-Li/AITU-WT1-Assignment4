# Assignment #4 — Forms and Validation

**Student:** Li Yixin · **Group:** SE-2526

A static website that demonstrates user-friendly HTML forms, built-in HTML5 validation and
Bootstrap 5 form components. Every task of the assignment lives on its own page and is reachable
from the navigation bar.

**Live demo:** https://cce-li.github.io/AITU-WT1-Assignment4/

## Tasks

| Part | Task | Page | What it shows |
| ---- | ---- | ---- | ------------- |
| 1 | Task 0. Simple Contact Form | [`task0.html`](task0.html) | Plain contact form (name, email, message, submit) where every field has a `<label>` bound through `for` / `id`. |
| 1 | Task 1. HTML5 Validation | [`task1.html`](task1.html) | Built-in validation attributes (`required`, `type="email"`, `minlength`, `maxlength`, `pattern`, `title`) enforced by the browser. |
| 2 | Task 2. Bootstrap Form Styling | [`task2.html`](task2.html) | The same form rebuilt with `form-control`, `form-select`, `form-label`, `form-check`, `form-text` and the grid system, plus placeholders and helper text. |
| 2 | Task 3. Bootstrap Validation Styles | [`task3.html`](task3.html) | `is-valid` / `is-invalid` classes with `valid-feedback` / `invalid-feedback` messages ("Looks good!", "Name is required.", …). |
| 3 | Task 4. Registration Form | [`task4.html`](task4.html) | Responsive registration form: names, email, password + confirmation, gender radio buttons, hobby checkboxes, country dropdown, Submit and Reset. |

The home page [`index.html`](index.html) gives an overview of all tasks and links to them.

## Project structure

```
.
├── index.html              # Home page with the task overview
├── task0.html              # Part 1 · Task 0 — simple contact form
├── task1.html              # Part 1 · Task 1 — HTML5 validation
├── task2.html              # Part 2 · Task 2 — Bootstrap form styling
├── task3.html              # Part 2 · Task 3 — Bootstrap validation feedback
├── task4.html              # Part 3 · Task 4 — registration form
├── css/
│   └── style.css           # Custom styles on top of Bootstrap
└── js/
    └── form-validation.js  # is-valid / is-invalid logic and feedback messages
```

## How to run

No build step and no dependencies to install — the site is plain HTML, CSS and JavaScript with
Bootstrap loaded from the jsDelivr CDN.

1. **Open the file directly:** double-click `index.html`.
2. **Or serve it locally** (recommended, avoids any file:// restrictions):
   ```bash
   python -m http.server 8000
   ```
   and open `http://localhost:8000` in a browser.

## How the validation works

* **Task 1** relies on the browser alone. The form has no JavaScript, so the native error bubbles
  and the `:invalid` styling do all the work.
* **Tasks 3 and 4** use the Bootstrap pattern:
  * the form is marked with `class="needs-validation"` and `novalidate` so the native bubbles stay hidden;
  * `js/form-validation.js` calls `checkValidity()` on every input, then adds `is-valid` or `is-invalid`;
  * Bootstrap only reveals the `valid-feedback` / `invalid-feedback` element that directly follows the
    coloured input;
  * `data-error-required` and `data-error-invalid` switch the message depending on *why* a field is
    invalid (for example "Email is required." versus "Please enter a valid email address.");
  * radio buttons are validated as one group, so one checked option makes the whole group valid;
  * `setCustomValidity()` handles the rule HTML cannot express on its own — "Passwords do not match.";
  * a valid submit shows the green success alert and resets the form; a broken one focuses the first
    invalid field.

## Publish on GitHub Pages

The repository ships with a Pages workflow (`.github/workflows/pages.yml`), so publishing is automatic:

1. Push your changes to the `main` branch.
2. The workflow uploads the repository root as a Pages artifact and deploys it.
3. The site is served at `https://cce-li.github.io/AITU-WT1-Assignment4/`.

If the deployment does not start, open **Settings → Pages** once and set *Source* to
**GitHub Actions**.

## Built with

HTML5 · CSS3 · Bootstrap 5.3 (CDN) · vanilla JavaScript
