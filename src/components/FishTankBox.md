<div>
  <h2>What is it ?<h2>
  <p>The box component is similar to a block or inline level element tag. It is a container to group elements and divide the HTML into sections. Generally, the box component will not itself be visible in the UI, but form the invisible structure that the visible elements reside in. It also comes preconfigured with properties that align to the Fish Tank space scale.<p>

  <iframe src="https://codesandbox.io/embed/81ppn7jl9l?fontsize=14" title="@fishtank/Box" allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

  ```jsx
  <fish-tank-box
    id="app"
    as="main"
    color="link"
    width="100%"
    display="flex"
    direction="column"
    justify-content="around"
    alignItems="center"
    class="something"
  >
  Box Content
  </fish-tank-box>
  ```
</div>