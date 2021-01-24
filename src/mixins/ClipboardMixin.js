import ToastMixin, {toastVariants} from '@/mixins/ToastMixin';

export default {
  mixins: [ToastMixin],
  methods: {
    notifyClipSuccess() {
      this.showToast('Success', 'Copied to clipboard', toastVariants.SUCCESS);
    },
    notifyClipError(err) {
      this.showToast(
        'Error',
        `Error copying to clipboard ${err}`,
        toastVariants.ERROR
      );
    },
  },
};
