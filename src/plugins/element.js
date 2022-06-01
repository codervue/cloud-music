import Vue from "vue"

import {
    Carousel,
    CarouselItem,
    Image, Dialog,
    Form,
    FormItem,
    Button,
    Slider,
    Input,
    Row,
    Table,
    TableColumn,
    Message,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Drawer,
    Autocomplete,
    Popover,
    Loading,
} from "element-ui"


Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Image);
Vue.use(Dialog);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Slider);
Vue.use(Input);
Vue.use(Row);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Drawer);
Vue.use(Autocomplete);
Vue.use(Popover);
Vue.use(Loading);
// Vue.use(MessageBox);
// Vue.use(Message);//不需要use，只有引用就行，否则弹出空白的消息提示框


Vue.prototype.$message = Message