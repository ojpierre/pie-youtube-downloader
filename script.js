const btn = document.getElementById("btn");
const URLInput = document.querySelector(".URL-input");
const select = document.querySelector(".opt");
const serverURL = "http://localhost:4000";

btn.addEventListener("click", async () => {
  if (!URLInput.value) {
    alert("Enter YouTube URL");
  } else {
    try {
      const format = select.value;
      const res = await fetch(
        `${serverURL}/download?url=${encodeURIComponent(
          URLInput.value
        )}&format=${format}`
      );
      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          const url = data.info.url;
          const a = document.createElement("a");
          a.href = url;
          a.download = `video.${format}`;
          document.body.appendChild(a); // Required for Firefox
          a.click();
          document.body.removeChild(a); // Cleanup
        } else {
          alert(data.error);
        }
      } else {
        const errorMessage = await res.text();
        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
    }
  }
});
