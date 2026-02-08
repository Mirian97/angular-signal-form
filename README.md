# 🐾 Pet Registration Form — Angular Signals

This project was created to **study and practice form handling using Angular Signals**, comparing the traditional **Reactive Forms** approach with the new **Signals-based Forms API (`@angular/forms/signals`)**.

## 🎯 Project Goal

- Learn and practice:
  - `signal`
  - `form()`
  - `FormField`
  - Declarative validations with `required`, `min`, `max`, `minLength`, and `validate`
- Compare **Reactive Forms vs Signals Forms**
- Explore a more declarative and reactive way to handle forms in modern Angular

## 🧪 What’s Implemented

The project contains **two versions of the same Pet Registration Form**:

### 1️⃣ Reactive Forms Version

📁 `PetRegistrationForm`

- Uses `FormBuilder`, `FormGroup`, and `Validators`
- Traditional and widely used Angular approach
- Manual control of form state (`touched`, `invalid`, etc.)

### 2️⃣ Signals Form Version (Project Focus)

📁 `PetRegistrationFormSignals`

This is the main focus of the repository 🚀

#### ✨ Highlights

- Uses `signal` as the **single source of truth**
- Form creation using `form(model, (path) => { ... })`
- Centralized and declarative validations
- Less imperative code
- Fully reactive form state

## 🧠 Signals Form Structure

### Data model

```ts
interface PetFormData {
  name: string;
  type: string;
  breed: string;
  age: number;
  weight: number;
  color: string;
  birthDate: string;
  gender: string;
  observations: string;
}
```

### Model signal

```ts
petModel = signal<PetFormData>(perFormDefaultValues);
```

### Form creation

```ts
petForm = form(this.petModel, (path) => {
  required(path.name);
  minLength(path.name, 2);

  required(path.type);
  required(path.breed);
  minLength(path.breed, 2);

  min(path.age, 0);
  max(path.age, 30);
});
```

## ✅ Custom validations with `validate`

Business rule validation example:

```ts
validate(path.type, ({ value }) => {
  if (value() === 'otro') {
    return {
      message: 'Pet type cannot be "other"',
      kind: 'error',
    };
  }
  return null;
});
```

Birth date validation example:

```ts
validate(path.birthDate, ({ value }) => {
  if (!value) return null;

  const today = new Date();
  const birthDate = new Date(value());

  if (birthDate >= today) {
    return {
      message: 'Birth date cannot be in the future',
      kind: 'error',
    };
  }
  return null;
});
```

## 🚀 Form submission

```ts
submit(this.petForm, async () => {
  console.log('Form submitted');
  await new Promise((resolve) => setTimeout(resolve, 1000));
  this.onReset();
});
```

- `submit()` ensures:
  - Full validation
  - Correct state updates (`touched`, `errors`)
  - Cleaner async flow

## 🔄 Form reset

```ts
onReset() {
  this.petModel.set(perFormDefaultValues);
  this.petForm().reset();
}
```

## 📌 Key learnings

- Signals-based forms are:
  - More declarative
  - Easier to reason about
  - Less boilerplate-heavy

- Reading form state (`valid`, `invalid`, `errors`) feels more straightforward
- A strong alternative for new Angular projects
