# QUICK REFERENCE: Text Colors for OASIS AI

## 🎨 Color Palette (WCAG AA Compliant)

### Use These Tailwind Classes:

```jsx
// Headlines & Titles
<h1 className="text-white">Pure White - Maximum Impact</h1>

// Subheadings & Section Intros  
<h2 className="text-secondary">Very readable #E5E7EB</h2>

// Body Text & Paragraphs
<p className="text-light-gray">Standard body text #D1D5DB</p>
<p className="text-tertiary">Same as above #D1D5DB</p>

// Captions & Metadata
<small className="text-muted">Subtle but visible #9CA3AF</small>

// Links & Accents
<a className="text-neon">Neon blue links #00D4FF</a>
```

## 📊 Contrast Ratios

| Class | Color | Contrast | WCAG |
|-------|-------|----------|------|
| `text-white` | #FFFFFF | 19.5:1 | ✅ AAA |
| `text-secondary` | #E5E7EB | 14.5:1 | ✅ AAA |
| `text-light-gray` | #D1D5DB | 10.5:1 | ✅ AAA |
| `text-tertiary` | #D1D5DB | 10.5:1 | ✅ AAA |
| `text-muted` | #9CA3AF | 7.5:1 | ✅ AA |
| `text-neon` | #00D4FF | 8.2:1 | ✅ AA |

## ✅ What to Use Where

```jsx
// Hero sections
<h1 className="text-5xl font-bold text-white">Headline</h1>
<p className="text-xl text-light-gray">Subheadline</p>

// Content cards
<h3 className="text-white">Card Title</h3>
<p className="text-light-gray">Card description</p>

// Form labels
<label className="text-secondary">Email Address</label>

// Footer
<a className="text-light-gray hover:text-neon">Link</a>
```

## ❌ Don't Use These

- ~~`text-gray-600`~~ - TOO DARK
- ~~`text-gray-700`~~ - INVISIBLE  
- ~~`text-white/30`~~ - TOO TRANSPARENT
- ~~`opacity-30`~~ on text containers

## 💡 Pro Tips

1. Headlines = `text-white` (always)
2. Body text = `text-light-gray` (default choice)
3. Labels = `text-secondary` (slightly brighter)
4. Metadata = `text-muted` (subtle but readable)
5. Links = `text-neon` (brand color)

**All colors now meet WCAG AA standards! 🎉**
