import Vue from 'vue'
import {
  Button,
  Input,
  Form,
  FormItem,
  Message,
  Container,
  Aside,
  Main,
  Header,
  Menu,
  Submenu,
  MenuItemGroup,
  MenuItem,
  Breadcrumb,
  BreadcrumbItem,
  Card,
  Row,
  Col,
  Table,
  TableColumn,
  Switch,
  Tooltip,
  Pagination,
  Dialog,
  MessageBox
} from 'element-ui'

Vue.use(Button)
  .use(Input)
  .use(Form)
  .use(FormItem)
  .use(Container)
  .use(Aside)
  .use(Main)
  .use(Header)
  .use(Menu)
  .use(Submenu)
  .use(MenuItemGroup)
  .use(MenuItem)
  .use(Breadcrumb)
  .use(BreadcrumbItem)
  .use(Card)
  .use(Row)
  .use(Col)
  .use(TableColumn)
  .use(Table)
  .use(Switch)
  .use(Tooltip)
  .use(Pagination)
  .use(Dialog)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm 