# ResponsiveMenus.js
This script adds accessibility-compatible responsive menus to Genesis Framework child themes. It is intended as a drop-in plugin that accepts a localized object of settings for the script to use.

## Settings
Settings can be added by localizing an array of appropriate values to the responsive-menus.js script (or responsive-menus.min.js if you are serving production).

```php
function prefix_responsive_menu_settings() {

	$settings = array(
		'mainMenu'         => __( 'Menu', 'magazine' ),
		'menuIconClass'    => 'dashicons-before dashicons-menu',
		'subMenu'          => __( 'Menu', 'magazine' ),
		'subMenuIconClass' => 'dashicons-before dashicons-arrow-down-alt2',
		'menuClasses'      => array(
			'combine' => array(
				'.nav-primary',
				'.nav-header',
				'.nav-secondary',
			),
			'others'  => array(
				'.nav-footer',
				'.nav-sidebar',
			),
		),
	);

	return $settings;

}
```

Next, localize your settings to the responsive menus script (this way for readability):

```php
wp_localize_script(
	'responsive-menu-handle',
	'genesis_responsive_menu',
	prefix_responsive_menu_settings()
);
```

## Options
### `mainMenu`
**Required**. Accepts a string of text to use for the Main Menu toggle button. Pass an empty string for no text.

### `menuIconClass`
Accepts a string of classes. These will be passed to an empty `<span>` tag within the Main Menu toggle button. To bypass an icon being added, pass an empty string to the value.

*Removing defaults to the dashicons menu icon.*

### `subMenu`
**Required**. Accepts a string of text to use for the Sub Menu toggle button (wrapped in `<span class="screen-reader-text"></span>`). Pass an empty string for no text (not recommended).

### `subMenuIconClass`
**Required**. Accepts a string of classes. These will be passed to an empty `<span>` tag within the Sub Menu toggle button to be used for dropdowns.

### `menuClasses`
**Required**. Accepts two separate arrays for menus to combine and menus to handle as their own.

#### `combine`
Accepts an array of menu class names to target. Menus are treated by order of appearance, so the first value in the array will get the Main Menu toggle button, while the rest will be appended (or combined) to that first menu. If the first menu is not on the page, the next menu in the array will be given priority as the first, and so on.

If there is only one menu showing on the page that's within the `combine` array, this menu will be shifted to the `others` array and combining will be skipped to save resources.

#### `others`
Accepts an array of menu class names to target. Each menu will recieve it's own Main Menu toggle and act separately from all others on the page.

### Required CSS
The script relies on media query CSS declarations in order to trigger it's functionality. The following CSS is required in your Genesis child theme in order for the script to work properly:

#### Inactive Styles
Use the following styles for when you **don't** want the script to activate:

```css
/* Accessible Menu
--------------------------------------------- */

.menu .menu-item:focus {
	position: static;
}

.menu .menu-item > a:focus + ul.sub-menu,
.menu .menu-item.sfHover > ul.sub-menu {
	left: auto;
	opacity: 1;
}

.menu-toggle,
.sub-menu-toggle {
	display: none;
	visibility: hidden;
}
```

#### Active Styles
Use the following styles as a starting point for when you **want** the menu to work. Usually nested in a media query defining the trigger point (added for reference):

```css
@media only screen ( max-width: 800px ) {
	.genesis-responsive-menu .wrap {
		padding: 0;
	}

	.genesis-responsive-menu {
		display: none;
		position: relative;
	}

	.genesis-skip-link .skip-link-hidden {
		display: none;
		visibility: hidden;
	}

	.menu-toggle,
	.sub-menu-toggle {
		border-width: 0;
		background-color: #fff;
		color: #333;
		display: block;
		margin: 0 auto;
		overflow: hidden;
		text-align: center;
		visibility: visible;
	}

	.menu-toggle:focus,
	.menu-toggle:hover,
	.sub-menu-toggle:focus,
	.sub-menu-toggle:hover {
		background: transparent;
		color: #c3251d;
		border-width: 0;
	}

	.menu-toggle {
		line-height: 20px;
		position: relative;
		z-index: 1000;
		width: 100%;
	}

	.menu-toggle::before {
		font-size: 1.5em;
		margin-right: 10px;
		text-rendering: auto;
		vertical-align: middle;
	}

	.sub-menu-toggle {
		float: right;
		padding: 10px;
		position: absolute;
		right: 0;
		top: 0;
		z-index: 100;
	}

	.sub-menu-toggle::before {
		display: inline-block;
		text-rendering: auto;
		-webkit-transform: rotate( 0 );
		-ms-transform:     rotate( 0 );
		transform:         rotate( 0 );
		-webkit-transition: transform .25s ease-in-out;
		-ms-transition:     transform .25s ease-in-out;
		transition:         transform .25s ease-in-out;
	}

	.sub-menu-toggle.activated::before {
		-webkit-transform: rotate( 180deg );
		-ms-transform:     rotate( 180deg );
		transform:         rotate( 180deg );
	}

	.genesis-responsive-menu .genesis-nav-menu .menu-item {
		display: block;
		float: none;
		position: relative;
		text-align: left;
	}

	.genesis-responsive-menu .genesis-nav-menu .menu-item:focus,
	.genesis-responsive-menu .genesis-nav-menu .menu-item:hover {
		position: relative;
	}

	.genesis-responsive-menu .genesis-nav-menu a:focus,
	.genesis-responsive-menu .genesis-nav-menu a:hover {
		color: #c3251d;
	}

	.genesis-responsive-menu .genesis-nav-menu .menu-item a {
		border: none;
		margin-bottom: 1px;
		padding: 15px 20px;		
		width: 100%;
	}

	.genesis-responsive-menu .genesis-nav-menu .sub-menu {
		border: none;
	}

	.genesis-responsive-menu .genesis-nav-menu .menu-item > a:focus ul.sub-menu,
	.genesis-responsive-menu .genesis-nav-menu .menu-item > a:focus ul.sub-menu .sub-menu {
		left: 0;
		margin-left: 0;
	}

	.genesis-responsive-menu .genesis-nav-menu > .menu-item-has-children > a::after {
		content: none;
	}

	.genesis-responsive-menu .genesis-nav-menu .sub-menu {
		clear: both;
		display: none;
		margin: 0;
		opacity: 1;
		padding-left: 15px;
		position: static;
		width: 100%;
	}

	.genesis-responsive-menu .genesis-nav-menu .sub-menu .sub-menu {
		margin: 0;
	}
}
```
