# ResponsiveMenus.js
This script adds accessibility-compatible responsive menus to Genesis Framework child themes. It is intended as a drop-in plugin that accepts a localized object of settings for the script to use.

## Settings
Settings can be added by localizing an array of appropriate values to the repsonsive-menus.js script (or responsive-menus.min.js if you are serving production).

```php
function prefix_responsive_menu_settings() {
	
	$settings = array(
		'mainMenu'         => __( 'Menu', 'magazine' ),
		'subMenu'          => __( 'Menu', 'magazine' ),
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
		'menuIconClass'    => 'dashicons-before dashicons-menu',
		'subMenuIconClass' => 'dashicons-before dashicons-arrow-down-alt2',
	);

	return $settings;

}
```

Next, localize your settings to the responsive menus script:

```php
$output = prefix_responsive_menu_settings();
wp_localize_script( 'responsive-menu-handle', 'genesis_responsive_menu', $output );
```

## Options
###`mainMenu`
Accepts a string of text to use for the Main Menu toggle button. Pass an empty string for no text.

*Required*

###`subMenu`
**Required**. Accepts a string of text to use for the Sub Menu toggle button (wrapped in `<span class="screen-reader-text"></span>`). Pass an empty string for no text (not recommended).

###`menuClasses`
**Required**. Accepts two separate arrays for menus to combine and menus to handle as their own.

####`combine`
Accepts an array of menu class names to target. Menus are treated by order of appearance, so the first value in the array will get the Main Menu toggle button, while the rest will be appended (or combined) to that first menu. If the first menu is not on the page, the next menu in the array will be given priority as the first, and so on.

If there is only one menu showing on the page that's within the `combine` array, this menu will be shifted to the `others` array and combining will be skipped to save resources.

####`others`
Accepts an array of menu class names to target. Each menu will recieve it's own Main Menu toggle and act separately from all others on the page.

###`menuIconClass`
Accepts a string of classes. These will be passed to an empty `<span>` tag within the Main Menu toggle button. To bypass an icon being added, pass an empty string to the value.

*Removing defaults to the dashicons menu icon.*

###`subMenuIconClass`
**Required**. Accepts a string of classes. These will be passed to an empty `<span>` tag within the Sub Menu toggle button to be used for dropdowns.

#### Credits
Based off Robin's accessible menu script, and modified heavily for reusability in StudioPress themes, and maintained by Calvin Koepke, Lauren Mancke, and Jen Baumann.