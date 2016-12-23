<style lang="scss">
.host-editor-wrapper {
    padding: 0;
}
.md-help-host,
.md-save-host,
.md-theme-host {
    position: absolute;
    z-index: 10;
    top: 20px!important;
}
.md-save-host {
    right: 30px!important;
}
.md-help-host {
    right: 138px!important;
}
.md-theme-host {
    margin: 6px 8px;
    right: 85px!important;
}
.host-help {
    text-align: left;
    h5 {
        margin-top: 10px;
    }
    pre {
        background-color: #fafafa;
    }
}
</style>
<template>
<div class="host-editor-wrapper">
    <md-button @click="saveHost" class="has-ripple md-fab md-raised md-warn md-fab-top-right md-save-host">
        <md-tooltip md-direction="left">保存Editor(Ctrl/Command+S),Sidebar Change Auto Save</md-tooltip>
        <md-icon>save</md-icon>
    </md-button>
    <md-menu class="md-theme-host" md-size="2">
        <md-button class="md-mini md-fab md-raised md-icon-button" md-menu-trigger>
            <md-icon>style</md-icon>
        </md-button>
        <md-menu-content>
            <md-menu-item @click="$parent.changeTheme(itheme)" v-for="itheme in ['github', 'monokai', 'cobalt', 'solarized_light']">{{itheme}}</md-menu-item>
        </md-menu-content>
    </md-menu>
    <md-button @click="$parent.openDialog('dialog')" class="md-mini md-fab md-raised md-fab-top-right md-help-host">
        <md-tooltip md-direction="left">HELP(帮助信息)</md-tooltip>
        <md-icon>help</md-icon>
    </md-button>

    <aceEditor ref="aceor" :content.sync="content" :onsave="saveHost" :height="height" :width="width" :sync="true" :theme="theme" />
</div>
</template>

<script>
require('../../utils/ace-host.js');
import doHost from '../../utils/host'
import aceEditor from '../Ace'
export default {
    components: {
        aceEditor
    },
    props: {
        content: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: '100%'
        },
        width: {
            type: String,
            default: '100%'
        },
        theme: {
            type: String
        }
    },
    mounted() {
        this.$refs.aceor.editor.commands.addCommands([{
            name: "find",
            bindKey: {
                win: 'Ctrl-F',
                mac: 'Command-F',
            },
            exec: function(editor) {
                ace.config.loadModule("ace/ext/searchbox", function(e) {
                    e.Search(editor)
                });
            },
            readOnly: true
        }, {
            name: 'save',
            bindKey: {
                win: 'Ctrl-S',
                mac: 'Command-S'
            },
            exec: function(env, args, request) {
                vm.onsave()
            }
        }]);
    },
    methods: {
        saveHost() {
            var success = doHost.saveHost(this.$refs.aceor.editor.getValue())
            if (success) {
                this.$parent.updateFile()
                this.$parent.openDialog('dialog', 'success', '保存成功！')
            }
        }
    }
}
</script>
