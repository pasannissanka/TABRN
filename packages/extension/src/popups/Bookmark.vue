<template>
  <div class="container" style="width: 500px; height: 200px">
    <div id="logo" class="w-100 flex justify-start mt-5 mx-5">
      <span>
        <svg
          width="50"
          height="50"
          viewBox="0 0 333 399"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M81 33V234.25V263L170.5 205.5L260 263V33C260 14.6 245.083 10 237.625 10H103.375C85.475 10 81 25.3333 81 33Z"
            stroke="black"
            stroke-width="20"
          />
          <path
            d="M32.1328 302.219V320.922H45.1406V335.828H32.1328V373.797C32.1328 376.609 32.6719 378.625 33.75 379.844C34.8281 381.062 36.8906 381.672 39.9375 381.672C42.1875 381.672 44.1797 381.508 45.9141 381.18V396.578C41.9297 397.797 37.8281 398.406 33.6094 398.406C19.3594 398.406 12.0938 391.211 11.8125 376.82V335.828H0.703125V320.922H11.8125V302.219H32.1328ZM100.547 397C99.6094 395.172 98.9297 392.898 98.5078 390.18C93.5859 395.664 87.1875 398.406 79.3125 398.406C71.8594 398.406 65.6719 396.25 60.75 391.938C55.875 387.625 53.4375 382.188 53.4375 375.625C53.4375 367.562 56.4141 361.375 62.3672 357.062C68.3672 352.75 77.0156 350.57 88.3125 350.523H97.6641V346.164C97.6641 342.648 96.75 339.836 94.9219 337.727C93.1406 335.617 90.3047 334.562 86.4141 334.562C82.9922 334.562 80.2969 335.383 78.3281 337.023C76.4062 338.664 75.4453 340.914 75.4453 343.773H55.125C55.125 339.367 56.4844 335.289 59.2031 331.539C61.9219 327.789 65.7656 324.859 70.7344 322.75C75.7031 320.594 81.2812 319.516 87.4688 319.516C96.8438 319.516 104.273 321.883 109.758 326.617C115.289 331.305 118.055 337.914 118.055 346.445V379.422C118.102 386.641 119.109 392.102 121.078 395.805V397H100.547ZM83.7422 382.867C86.7422 382.867 89.5078 382.211 92.0391 380.898C94.5703 379.539 96.4453 377.734 97.6641 375.484V362.406H90.0703C79.8984 362.406 74.4844 365.922 73.8281 372.953L73.7578 374.148C73.7578 376.68 74.6484 378.766 76.4297 380.406C78.2109 382.047 80.6484 382.867 83.7422 382.867ZM202.219 359.664C202.219 371.852 199.617 381.367 194.414 388.211C189.211 395.008 181.945 398.406 172.617 398.406C164.367 398.406 157.781 395.242 152.859 388.914L151.945 397H133.664V289H153.984V327.742C158.672 322.258 164.836 319.516 172.477 319.516C181.758 319.516 189.023 322.938 194.273 329.781C199.57 336.578 202.219 346.164 202.219 358.539V359.664ZM181.898 358.188C181.898 350.5 180.68 344.898 178.242 341.383C175.805 337.82 172.172 336.039 167.344 336.039C160.875 336.039 156.422 338.688 153.984 343.984V374.008C156.469 379.352 160.969 382.023 167.484 382.023C174.047 382.023 178.359 378.789 180.422 372.32C181.406 369.227 181.898 364.516 181.898 358.188ZM257.555 339.977C254.789 339.602 252.352 339.414 250.242 339.414C242.555 339.414 237.516 342.016 235.125 347.219V397H214.805V320.922H234L234.562 329.992C238.641 323.008 244.289 319.516 251.508 319.516C253.758 319.516 255.867 319.82 257.836 320.43L257.555 339.977ZM286.102 320.922L286.734 329.711C292.172 322.914 299.461 319.516 308.602 319.516C316.664 319.516 322.664 321.883 326.602 326.617C330.539 331.352 332.555 338.43 332.648 347.852V397H312.328V348.344C312.328 344.031 311.391 340.914 309.516 338.992C307.641 337.023 304.523 336.039 300.164 336.039C294.445 336.039 290.156 338.477 287.297 343.352V397H266.977V320.922H286.102Z"
            fill="black"
          />
        </svg>
      </span>
    </div>
    <div class="w-100 flex justify-center mx-5 my-4 bg-gray-400 border"></div>
    <form>
      <div class="w-100 flex justify-center">
        <p
          v-text="text_content"
          class="tribute-input mx-5 w-full h-48 max-h-72 overflow-y-scroll"
          name="bookmark_data"
          id="bookmark_data"
        ></p>
        <!-- <textarea name="" id="" cols="30" rows="10"></textarea> -->
      </div>
      <div class="w-100 grid gap-2 grid-cols-5 mb-2 mt-4 mx-5">
        <div
          class="
            flex flex-wrap
            col-span-1
            content-center
            text-center text-lg
            font-medium
          "
        >
          Save to
        </div>
        <div class="col-span-4">
          <select
            v-model="selectedWorkspace"
            placeholder="Select Workspace"
            id="workspace_select"
            class="mr-5 w-full"
          >
            <option value="" disabled hidden>Select a workspace</option>
            <option
              v-for="workspace in workspaces"
              :value="workspace.key"
              :key="workspace.key"
            >
              {{ workspace.value }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-100 flex justify-end">
        <button
          @click="submit"
          class="
            focus:ring-primary-200
            btn-primary
            inline-flex
            justify-center
            mb-5
            ml-1
            mr-5
            mt-2
            px-4
            py-2
            text-sm
            font-medium
            border border-transparent
            rounded-md
            transition-colors
            duration-300
            focus:ring-1
          "
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import browser from 'webextension-polyfill';
import Tribute from 'tributejs';

export default {
  data() {
    return {
      text_content: '',
      workspaces: [],
      tags: [],
      selectedWorkspace: '',
      items: [
        {
          value: 'cat',
          label: 'Mr Cat',
        },
        {
          value: 'dog',
          label: 'Mr Dog',
        },
      ],
      isEditable: true,
    };
  },
  mounted() {
    browser.tabs.query({ currentWindow: true, active: true }).then((tab) => {
      this.text_content = `# ${tab[0].title}\n\n`;
    });

    this.getBookmarkData()
      .then((data) => {
        console.log(data);
        if (data) {
          this.workspaces = data.data.workspaces;
          this.tags = data.data.tags;

          console.log(this.tags, this.workspaces);
        }
      })
      .catch((err) => console.log(err));

    const tribute = new Tribute({
      collection: [
        {
          // The function that gets call on select that retuns the content to insert
          selectTemplate: function (item) {
            // if (this.range.isContentEditable(this.current.element)) {
            const value = `<span contenteditable="false"><a href="http://zurb.com" target="_blank" title="'
              ${item.original.email}"> ${item.original.value}</a></span>`;
            this.text_content += value;
            return value;
            // }
            // return '@' + item.original.value;
          },

          // the array of objects
          values: [
            {
              key: 'Jordan Humphreys',
              value: 'Jordan Humphreys',
              email: 'jordan@zurb.com',
            },
            {
              key: 'Sir Walter Riley',
              value: 'Sir Walter Riley',
              email: 'jordan+riley@zurb.com',
            },
          ],
        },
        {
          // The symbol that starts the lookup
          trigger: '#',

          // The function that gets call on select that retuns the content to insert
          selectTemplate: function (item) {
            return '#' + item.original.value;
          },
          // function retrieving an array of objects
          values: (_, cb) => {
            console.log(this.workspaces);
            cb(this.workspaces);
          },
          lookup: 'value',

          fillAttr: 'value',
        },
      ],
    });

    tribute.attach(document.getElementById('bookmark_data'));

    document
      .getElementById('bookmark_data')
      .addEventListener('tribute-replaced', function (e) {
        console.log(
          'Original event that triggered text replacement:',
          e.detail.event
        );
        console.log('Matched item:', e.detail.item);
      });
  },
  methods: {
    submit(event) {
      event.preventDefault();
      console.log(event);
      console.log(this.text_content, this.selectedWorkspace);
    },
    async getBookmarkData() {
      const data = await browser.runtime.sendMessage({
        message: 'get_create_bookmark_data',
      });
      return data;
    },
  },
};
</script>
<style>
.tribute-input {
  outline: none;
  border: 1px solid #eee;
  padding: 3px 5px;
  border-radius: 2px;
  font-size: 15px;
  min-height: 32px;
  cursor: text;
}
.tribute-input:focus {
  border-color: #d1d1d1;
  background-color: #fbfbfb;
}
[contenteditable='true']:empty:before {
  content: attr(placeholder);
  display: block;
  color: #ccc;
}
.tribute-container {
  position: absolute;
  top: 0;
  left: 0;
  height: auto;
  max-height: 300px;
  max-width: 500px;
  overflow: auto;
  display: block;
  z-index: 999999;
}
.tribute-container ul {
  margin: 0;
  margin-top: 2px;
  padding: 0;
  list-style: none;
  background: #efefef;
}
.tribute-container li {
  padding: 5px 5px;
  cursor: pointer;
}
.tribute-container li.highlight {
  background: #ddd;
}
.tribute-container li span {
  font-weight: bold;
}
.tribute-container li.no-match {
  cursor: default;
}
.tribute-container .menu-highlighted {
  font-weight: bold;
}
</style>
