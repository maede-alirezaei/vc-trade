# vc-trade

## Project Overview

This project is a User Search Page implementation based on user requests. The goal is to create a page that allows users to search for other users within the company, display matching results, and show detailed information when a user is selected. The application retrieves user information from the [randomuser.me API](https://randomuser.me/documentation).

## Business Requirements

1. **Initial Loading:**
   - Upon page load, populate the results list with 25 user entries.

2. **Search and Filtering:**
   - Include a free text input at the top of the search list for filtering by the user's First name or Last name field.
   - Allow filtering by gender (only "male" and "female" are valid options).

5. **Infinite Scrolling:**
   - Infinite scrolling on the search list is implemented.


## Technical Requirements

- **Framework:**
  - The application must be developed using Vue 3, TypeScript.

- **Testing:**
  - Use Cypress for end-to-end testing.

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/your-repo.git

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
