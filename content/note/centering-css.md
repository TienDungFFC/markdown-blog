---
title: Centering in CSS
---
## 1. Content Center (Grid)
```css
.content-center {
  display: grid;
  place-content: center;
  gap: 1ch;
}
```
**Pros**:  
- Handles overflow well.  
- Centralizes editing styles in one spot.  
- Equal spacing for children with grid's default row creation.

**Cons**:  
- The widest child sets the width for all others.

**Use case**:  
- Great for layouts containing paragraphs, headlines, or elements that need to be read.

## 2. Gentle Flex (The Winner)
```css
.gentle-flex {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1ch;
}
```
**Pros**:  
- Pure centering without changing children's box sizes.  
- Equal spacing amongst children.  
- Works well in both macro and micro layouts.

**Cons**:  
- More lines of code compared to others.

**Use case**:  
- Suitable for macro layouts (large layouts containing smaller layouts) and micro layouts (small, concise layouts).

## 3. Autobot (Margin Auto)
```css
.autobot {
  display: flex;
}
.autobot > * {
  margin: auto;
}
```
**Pros**:  
- Quick and simple to implement.  
- Fun and intuitive trick.

**Cons**:  
- Can result in awkward layouts when overflowing.  
- No control over spacing between children.

**Use case**:  
- Useful for centering icons or pseudo-elements.

## 4. Fluffy Center (Padding Based)
```css
.fluffy-center {
  padding: 10ch;
}
```
**Pros**:  
- Protects content with padding.  
- Independent centering.

**Cons**:  
- Struggles with squishing and squashing.  
- Clashes between container and children sizes.

**Use case**:  
- Best for centering small, contained elements like buttons, tags, or pills.

## 5. Pop & Plop (Absolute Positioning)
```css
.container {
  position: relative;
}
.pop-plop {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
```
**Pros**:  
- Works well for overlay elements like modals or popovers.

**Cons**:  
- Difficult to manage with multiple items or complex layouts.

**Use case**:  
- Best for stacking elements or positioning messages and toasts.
