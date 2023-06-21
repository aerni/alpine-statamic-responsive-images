![NPM Version](https://badgen.net/npm/v/@aerni/alpine-statamic-responsive-images?style=flat-square)
![Build Size](https://badgen.net/badgesize/gzip/aerni/alpine-statamic-responsive-images/main/dist/cdn.min.js?style=flat-square)
![License](https://img.shields.io/github/license/aerni/alpine-statamic-responsive-images?style=flat-square)

# Alpine Statamic Responsive Images
This Alpine plugin replaces the inline script of the Statamic Responsive Images addon with a simple to use `x-statamic-responsive-images` directive. Using this directive resolves the issue of images not loading on subsequent page loads when using Statamic Responsive Images together with Laravel Livewire or pjax libraries like Swup, BarbaJS, and Turbolinks. 

You can also use this plugin if you simply like the idea of using a nice Alpine directive instead of the inline script in the `responsiveImage.blade.php` view.

This addon has been tested with `v3.12.2` of Statamic Responsive Images.

## Installation
You can use this plugin by either including it from a `<script>` tag or installing it via NPM:

### Via CDN
You can include the CDN build of this plugin as a `<script>` tag, just make sure to include it before Alpine's core script.

```html
<!-- Alpine Resize -->
<script defer src="https://cdn.jsdelivr.net/npm/@aerni/alpine-statamic-responsive-images@1.x.x/dist/cdn.min.js"></script>

<!-- Alpine Core -->
<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### Via NPM
You can install this plugin via NPM for use inside your bundle:

```
npm install @aerni/alpine-statamic-responsive-images
```

Then initialize it in your bundle:

```js
import Alpine from 'alpinejs'
import statamicResponsiveImages from '@aerni/alpine-statamic-responsive-images'

Alpine.plugin(statamicResponsiveImages)
```

## Usage
Replace the `data-statamic-responsive-images` attribute with `x-statamic-responsive-images` and delete the original inline script.

```diff
- @once
-    <script>
-        window.addEventListener('load', function () {
-            window.responsiveResizeObserver = new ResizeObserver((entries) => {
-                entries.forEach(entry => {
-                    const imgWidth = entry.target.getBoundingClientRect().width;
-                    entry.target.parentNode.querySelectorAll('source').forEach((source) => {
-                        source.sizes = Math.ceil(imgWidth / window.innerWidth * 100) + 'vw';
-                    });
-                });
-            });
-
-            document.querySelectorAll('[data-statamic-responsive-images]').forEach(responsiveImage => {
-                responsiveResizeObserver.onload = null;
-                responsiveResizeObserver.observe(responsiveImage);
-            });
-        });
-    </script>
- @endonce

<picture>
    @foreach (($breakpoints ?? []) as $breakpoint)
        @foreach($breakpoint->sources() ?? [] as $source)
            @php
                $srcSet = $source->getSrcset();
            @endphp

            @if($srcSet !== null)
                <source
                    @if($type = $source->getMimeType()) type="{{ $type }}" @endif
                    @if($media = $source->getMediaString()) media="{{ $media }}" @endif
                    srcset="{{ $srcSet }}"
                    @if($includePlaceholder ?? false) sizes="1px" @endif
                >
            @endif
        @endforeach
    @endforeach

    <img
        {!! $attributeString ?? '' !!}
        src="{{ $src }}"
        @unless (\Illuminate\Support\Str::contains($attributeString, 'alt'))
        alt="{{ $asset['alt'] ?? $asset['title'] }}"
        @endunless
        @isset($width) width="{{ $width }}" @endisset
        @isset($height) height="{{ $height }}" @endisset
        @if($hasSources)
-        data-statamic-responsive-images
+        x-statamic-responsive-images
        @endif
    >
</picture>
```
