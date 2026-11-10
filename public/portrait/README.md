# Portrait slot

The About section loads the portrait from:

```text
public/portrait/sena.jpg
```

Replace `sena.jpg` with your own photo and keep the same filename. Recommended:

- portrait crop, 4:5
- around 960 × 1200 px
- JPG or WebP
- under ~500 KB

The image is displayed with `object-cover`, so it fills the paper frame and crops
slightly if the aspect ratio differs. If you want to use another filename,
update the `src` in `components/site/About.tsx`. After replacing the file, bump
the `?v=2` cache-buster in that `src` if the browser still shows the old image.
