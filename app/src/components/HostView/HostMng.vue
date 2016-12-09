<style lang="scss">
  .host-list-group,
  .host-list-host{
      padding: 0
  }
  // .host-list-group .md-switch{
  //   position: absolute;
  //   right: -8px;
  //   top: 3px;
  // }
  .host-list-expand{
    padding: 0!important;
    .md-list-item, .md-list-item .md-list-item-container{
      height: 36px!important;
      min-height: 36px!important;
      color: #999;
    }
  }

  .host-list-expand .md-list-item .md-list-item-container{
     padding-left: 18px;
  }

  .host-list-expand .md-checkbox,
  .host-list-menu .md-checkbox,
  .host-list-menu > .md-button {
     margin: 0; padding: 0; width: 100%;
  }
  .host-list-sidebar{
    overflow: auto;
    display: block;
  }

  .host-list-menu{
    display: block;
  }
  .md-list-item {
    text-align: left;
    .text-ip{ color: #3f51b5; width: 80px; margin-right: 20px; display: inline-block;}
    .text-host{ }
  }
  .host-list-expand{
    .md-list-item{
      position: relative;
    }
    .md-checkbox-host{
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
                <md-button class="md-icon-button" @click="toggleSidenav">
                    <md-icon>menu</md-icon>
                </md-button>
                <span style="flex: 1"></span>
                <md-button class="md-icon-button">
                    <md-icon>search</md-icon>
                </md-button>
                <md-button class="md-icon-button">
                    <md-icon>view_module</md-icon>
                </md-button>
                <md-button class="md-fab md-mini">
                    <md-icon>add</md-icon>
                </md-button>
                <md-button class="md-fab md-warn">
                  <md-icon>save</md-icon>
                </md-button>
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

            <md-switch v-model="group.switcher" :name="group.name" @change="toggleHostByGroup(!group.switcher, group)" ></md-switch>
        </md-list-item>
        <md-subheader class="md-inset">按域名查看</md-subheader>

        <md-list v-for="(dlist, domain) in domains" class="host-list-host">
          <md-list-item @click="expand = !expand">
            <md-avatar>
              <img src="https://placeimg.com/40/40/people/5" :alt="domain">
            </md-avatar>

            <span>{{domain}}</span>

            <md-button class="md-icon-button md-list-action">
              <md-icon class="md-primary">chat_bubble</md-icon>
            </md-button>
          </md-list-item>
          <md-list class="host-list-expand">
             <md-list-item v-for="host in dlist" v-if="expand">
               <span>{{host.ip}}</span>
             </md-list-item>
          </md-list>
        </md-list>


        <!--<md-menu v-for="(dlist, domain) in domains" class="host-list-menu">
          <md-button md-menu-trigger>
            <md-list-item>
                <md-avatar v-md-theme="'blue'" class="md-avatar-icon md-primary">
                    <md-icon>insert_drive_file</md-icon>
                </md-avatar>
                <div class="md-list-text-container">
                    <span>{{domain}}</span>
                    <p>Jan 20, 2014</p>
                </div>
                <md-button class="md-icon-button md-list-action">
                    <md-icon>info</md-icon>
                </md-button>
            </md-list-item>
          </md-button>
          <md-menu-content>
            <md-menu-item v-for="host in dlist">{{host.ip}}</md-menu-item>
          </md-menu-content>
        </md-menu> -->
    </md-list>

    <!--<md-sidenav class="md-left" ref="sidebar">
        <md-toolbar class="md-account-header" v-md-theme="'blue'">
            <md-list class="md-transparent">
                <md-list-item class="md-avatar-list">
                    <md-avatar class="md-large">
                        <img src="https://placeimg.com/64/64/people/8" alt="People">
                    </md-avatar>

                    <span style="flex: 1"></span>

                    <md-avatar>
                        <img src="https://placeimg.com/40/40/people/3" alt="People">
                    </md-avatar>

                    <md-avatar>
                        <img src="https://placeimg.com/40/40/people/4" alt="People">
                    </md-avatar>
                </md-list-item>

                <md-list-item>
                    <div class="md-list-text-container">
                        <span>John Doe</span>
                        <span>johndoe@email.com</span>
                    </div>

                    <md-button class="md-icon-button md-list-action">
                        <md-icon>arrow_drop_down</md-icon>
                    </md-button>
                </md-list-item>
            </md-list>
        </md-toolbar>

        <md-list v-md-theme="'blue'">
            <md-list-item @click="toggleSidenav" class="md-primary">
                <md-icon>insert_drive_file</md-icon> <span>My files</span>
            </md-list-item>

            <md-list-item @click="toggleSidenav">
                <md-icon>people</md-icon> <span>Shared with me</span>
            </md-list-item>

            <md-list-item @click="toggleSidenav">
                <md-icon>access_time</md-icon> <span>Recent</span>
            </md-list-item>

            <md-list-item @click="toggleSidenav">
                <md-icon>start</md-icon> <span>Starred</span>
            </md-list-item>

            <md-list-item @click="toggleSidenav">
                <md-icon>delete</md-icon> <span>Trash</span>
            </md-list-item>
        </md-list>
    </md-sidenav>-->
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
    this.groups = doHost.hostByGroup(this.hostdata)
    this.domains = doHost.hostByDomain(this.hostdata)
    console.log(  this.groups,   this.domains)
  },

  methods:{
    toggleHostByItem(on, host, group){
      host.switcher = !host.switcher;
      doHost.toggleHost(host, this.originlines, function(){
         this.$parent.updateFile();
      }.bind(this));
    },
    toggleHostByGroup(open, group){
      group.switcher = open
      group.list.forEach(item => {item.switcher = open})
      doHost.toggleGroup(group);
    },
    toggleSidenav() {
      this.$refs.sidebar.toggle();
    }
  }
}
</script>
