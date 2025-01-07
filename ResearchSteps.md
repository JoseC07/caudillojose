# Steps to Display City Content Behind the Globe

To serve city content behind the globe and allow the globe to be visible through its background without altering the globe's CSS, follow these steps:

## 1. Adjust the Layout in `Home.tsx`

Ensure that the `CityContent` component is positioned behind the `GlobeNavigation` component. You can achieve this by utilizing CSS positioning and z-index.

### Steps:

- **Wrap the Components in a Container:**

  Create a container `div` that holds both `CityContent` and `GlobeNavigation`.

- **Apply Relative Positioning to the Container:**

  This allows child elements to be positioned absolutely within the container.

- **Set `CityContent` to Absolute Position:**

  Position `CityContent` absolutely to cover the entire viewport, ensuring it sits behind the globe.

- **Ensure `GlobeNavigation` Remains on Top:**

  Keep `GlobeNavigation` relatively positioned with a higher z-index to overlay it above the `CityContent`.

## 2. Modify `Home.tsx`

Update your `Home.tsx` to incorporate the positioning changes.

### Example: 