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
    Menu,
    MenuItem,
    MenuItemGroup,
    Empty,
    Skeleton,
    SkeletonItem,
    MessageBox,
    Tabs,
    TabPane
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
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Empty);
Vue.use(Skeleton);
Vue.use(SkeletonItem);
Vue.use(Tabs);
Vue.use(TabPane);
// Vue.use(Message);//不需要use，只要引用就行，否则弹出空白的消息提示框


Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm