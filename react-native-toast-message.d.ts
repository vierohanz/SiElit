declare module 'react-native-toast-message' {
  import {Component} from 'react';

  interface ToastShowParams {
    type: 'success' | 'error' | 'info';
    position?: 'top' | 'bottom';
    text1?: string;
    text2?: string;
    visibilityTime?: number;
    autoHide?: boolean;
    topOffset?: number;
    bottomOffset?: number;
    onShow?: () => void;
    onHide?: () => void;
    onPress?: () => void;
  }

  export default class Toast extends Component {
    static show(params: ToastShowParams): void;
    static hide(): void;
    static setRef(ref: any): void;
  }
}
