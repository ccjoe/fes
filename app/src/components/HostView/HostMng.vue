<style lang="scss">
  .host-list-group,
  .host-list-host{
      padding: 0
  }
  .host-list-expand{
    padding: 0!important;
    .md-list-item, .md-list-item .md-list-item-container{
      height: 36px!important;
      min-height: 36px!important;
      color: #999;
    }
    .md-list-item .md-list-item-container{
       padding-left: 18px;
    }
    .md-checkbox, .md-radio{
       margin: 0; padding: 0; width: 100%;
    }
  }


  .host-list-sidebar{
    overflow: auto;
    display: block;
  }

  .md-list-item {
    text-align: left;
    .text-ip{ color: #3f51b5; width: 90px; margin-right: 20px; display: inline-block;}
    .text-host{ }
  }
  .host-list-expand{
    .md-checkbox-host, .md-radio-host{
      position: absolute;
      width: 20px;
      top: 10px;
      right:20px;
    }
  }
</style>
<template>
<div class="complete-sidebar">
    <md-whiteframe md-elevation="3">
        <md-toolbar  v-md-theme="'light-blue'">
            <div class="md-toolbar-container">
                <md-button class="md-icon-button">
                    <md-icon>menu</md-icon>
                </md-button>
                <span style="flex: 1">
                  <md-input-container>
                    <label>search host</label>
                    <md-input placeholder="by domain/ip or group"></md-input>
                  </md-input-container>
                </span>
                <md-button class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>
                <!-- <md-button class="md-icon-button">
                    <md-icon>view_module</md-icon>
                </md-button> -->
            </div>
        </md-toolbar>
    </md-whiteframe>

    <md-list class="md-double-line host-list-sidebar" :style="{height: height}">
        <md-subheader class="md-inset">按组查看</md-subheader>
        <md-list-item v-for="group in groups"  class="host-list-group">
            <md-avatar class="md-avatar-icon">
                <md-icon>folder</md-icon>
            </md-avatar>
            <div class="md-list-text-container">
                <span>{{group.name}}</span>
                <p>Jan 9, 2014</p>
            </div>

            <md-list-expand class="host-list-expand">
              <md-list>
                <md-list-item class="md-inset" v-for="host in group.list" @click="toggleHostByItem(on, host, group)">
                    <div class="text-hostitem">
                      <span class="text-ip">{{host.ip}}</span>
                      <span class="text-host">{{host.host}}<md-tooltip md-direction="top">{{host.host}}</md-tooltip></span>
                    </div>
                    <div class="themed" v-md-theme="'green'">
                      <md-checkbox v-model="host.switcher" @change="toggleHostByItem(on, host, group)" class="md-primary md-checkbox-host"></md-checkbox>
                    </div>
                </md-list-item>
              </md-list>
            </md-list-expand>

            <md-switch v-model="group.switcher" :name="group.name" @click.stop.prevent="" @change="toggleHostByGroup(!group.switcher, group, $event)" ></md-switch>
        </md-list-item>
        
        <md-subheader class="md-inset">按域名查看</md-subheader>
        <md-list-item v-for="(dlist, domain) in domains" class="host-list-group" @click="">
            <md-avatar class="md-avatar-icon">
                <md-icon>folder</md-icon>
            </md-avatar>
            <div class="md-list-text-container">
                <span>{{domain}}</span>
                <p>Jan 9, 2014</p>
            </div>
            
            <md-list-expand class="host-list-expand">
              <md-list>
                <md-list-item class="md-inset" v-for="host in dlist" @click="changeHostIp(host, dlist)">
                    <div class="text-hostitem">
                      <span class="text-ip">{{host.ip}}</span>
                    </div>
                    <md-radio @change="changeHostIp(host, dlist)" v-model="dlist.selected" class="md-radio-host" :md-value="host.ip"></md-radio>
                </md-list-item>
              </md-list>
            </md-list-expand>
        </md-list-item>
    </md-list>
</div>
</template>

<script>
import doHost from '../../utils/host'
export default {
  props:{
    hostdata:{
      type: Array,
      default: []
    },
    originlines:{
      type: Array,
      default: []
    },
    height:{
      type: String,
      default: ''
    }
  },
  data(){
    return {
      domains: [],
      groups: []
    }
  },
  created(){
    this.updateHost()
  },
  watch:{
    hostdata(){
        this.updateHost()
    }
  },
  methods:{
    updateHost(){
      this.groups = doHost.hostByGroup(this.hostdata)
      this.domains = doHost.hostByDomain(this.hostdata)
      console.log(this.groups,   this.domains)
    },
    toggleHostByItem(on, host, group){
      host.switcher = !host.switcher;
      doHost.toggleHost(host, this.originlines, ()=>this.$parent.updateFile());
      this.gotoLine(host.index, 0)
    },
    toggleHostByGroup(open, group, $event){
      group.switcher = open
      group.list.forEach(item => {item.switcher = open})
      doHost.toggleHosts(group.list, this.originlines, ()=>this.$parent.updateFile());
      this.gotoLine(group.section[0], 0)
      return false;
    },
    changeHostIp(host, dlist){
      dlist.forEach(item => {item.switcher = false})
      host.switcher = true;
      doHost.toggleHosts(dlist, this.originlines, ()=>this.$parent.updateFile())
      dlist['selected'] = host.ip
      this.gotoLine(host.index, 0)
      // console.log('domains', host, dlist)
    },
    gotoLine(line, column){
      this.$parent.$refs.editor.$refs.aceor.editor.gotoLine(line, column, true)
    },
    toggleSidenav() {
      this.$refs.sidebar.toggle();
    }
  }
}
</script>
