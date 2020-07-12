<template>
  <div class="qr-main">
    <button class="ui secondary button qr-button" @click="toogleScanner">
      {{ qrAction }} QR Scanner
    </button>
    <qr-decoder class="qr-scanner" @decodeValue="valueDecoded" v-if="scanner"> </qr-decoder>
  </div>
</template>

<script>
import QrDecoder from '../../elements/QrDecoder';
import {mapState, mapActions, mapMutations} from 'vuex';
import {isFalsy} from '../../common/utils';
import {UPDATE_LOADING} from '../../store/mutations-types';
export default {
  components: {
    QrDecoder
  },
  data() {
    return {
      scanner: false,
      qrAction: 'Abrir',
      queueId: null
    };
  },
  computed: mapState({
    user: (state) => state.user
  }),
  methods: {
    toogleScanner() {
      console.log('Scanear QR');
      this.scanner = !this.scanner;
      this.qrAction = this.qrAction === 'Abrir' ? 'Cerrar' : 'Abrir';
    },
    async valueDecoded(result) {
      try {
        const queueInfo = JSON.parse(result);
        if (isFalsy(queueInfo) || isFalsy(queueInfo.queueId)) {
          throw new Error('Qr no valido');
        }
        this.queueId = queueInfo.queueId;
        this.sourceId = queueInfo.sourceId;
        await this.signIn();
        this.toogleScanner();
      } catch (err) {
        this.pushNotification({
          type: 'negative',
          title: 'Error al leer QR',
          message: 'Qr no valido para esta aplicación'
        });
      }
    },
    async signIn() {
      try {
        this.updateLoading({loading: true});
        await this.signIntoQueue({user: this.user, queue: {id: this.queueId, source_id: this.sourceId}});
      } catch (err) {
        this.pushNotification({
          type: 'negative',
          title: 'Error anotandose a cola ' + this.queueId,
          message: 'err'
        });
      }
      this.updateLoading({loading: false});
    },
    ...mapMutations({
      updateLoading: UPDATE_LOADING
    }),
    ...mapActions(['pushNotification', 'signIntoQueue'])
  }
};
</script>

<style scoped>
.qr-main {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.qr-button {
  margin: auto;
  margin-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  font-size: 30px;
  border: double 10px white;
}

.qr-scanner {
  margin: auto;
  width: 50%
}
</style>
