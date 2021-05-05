class config {
    check_key(key) {
        return key in this.keys;
    }

    check_value(key, value) {
        if (this.check_key(key)) {
            return this.keys[key].test(value);
        }
        return true;
    }

    check_block(block) {
        return block in this.blocks;
    }

    check_block_key(block, key) {
        if (this.check_block(block)) {
            return key in this.blocks[block].keys;
        }
        return false;
    }

    check_block_keyvalue(block, key, value) {
        if (this.check_block(block)) {
            if (this.blocks[block].keys[key]) {
                return this.blocks[block].keys[key].test(value);
            }
        }
        return true;
    }

    keys = {
        master: /.*/,
        server: /^\d?$/,
        username: /.*/,
        password: /.*/,
        loginPinCode: /^(\d{4,6})?$/,
        char: /^(\d{1,2})?$/,

        poseidonServer: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))?$/,
        poseidonPort: /^(\d+)?$/,

        bindIp: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))?$/,
        forceMapIP: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))?$/,

        XKore: /^(0|1|2|3)?$/,
        XKore_port: /^(\d+)?$/,
        XKore_dll: /.*/,
        XKore_injectDLL: /^(0|1)?$/,
        XKore_autoAttachIfOneExe: /^(0|1)?$/,
        XKore_silent: /^(0|1)?$/,
        XKore_bypassBotDetection: /^(0|1)?$/,
        XKore_exeName: /.*/,

        XKore_listenIp: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))?$/,
        XKore_listenPort: /^(\d+)?$/,
        XKore_publicIp: /^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?))?$/,
        XKore_ID: /.*/,

        secureAdminPassword: /^(0|1)?$/,
        adminPassword: /.*/,
        callSign: /.*/,
        commandPrefix: /^.?$/,
        callSignGM: /^(0|1)?$/,
        inGameAuth: /^(0|1)?$/,

        macAddress: /^([0-9a-fA-F]{12})?$/,

        pauseCharLogin: /^(0|1)?$/,
        pauseCharServer: /^(\d+)?$/,
        pauseMapServer: /^(\d+)?$/,
        ignoreInvalidLogin: /^(0|1)?$/,
        secureLogin_requestCode: /^([0-9a-fA-F]{2}\s?)*$/,

        whenInGame_requestCashPoints: /^(0|1)?$/,

        message_length_max: /^(\d+)?$/,

        //alias_

        allowedMaps: /^[a-z_@0-9, ]*$/,
        allowedMaps_reaction: /^(0|1)?$/,

        attackAuto: /^(-1|0|1|2)?$/,
        attackAuto_party: /^(0|1|2)?$/,
        attackAuto_onlyWhenSafe: /^(0|1)?$/,
        attackAuto_followTarget: /^(0|1)?$/,
        attackAuto_inLockOnly: /^(0|1|2)?$/,
        attackAuto_notInTown: /^(0|1)?$/,
        attackDistance: /^(\d{1,2})?$/,
        attackDistanceAuto: /^(0|1)?$/,
        attackMaxDistance: /^(\d{1,2})?$/,
        attackMaxRouteDistance: /^(\d{1,3})?$/,
        attackMaxRouteTime: /^(\d{1,2})?$/,
        attackMinPlayerDistance: /^(\d{1,2})?$/,
        attackMinPortalDistance: /^(\d{1,2})?$/,
        attackUseWeapon: /^(0|1)?$/,
        attackNoGiveup: /^(0|1)?$/,
        attackCanSnipe: /^(0|1)?$/,
        attackCheckLOS: /^(0|1)?$/,
        attackRouteMaxPathDistance: /^(\d{1,3})?$/,
        attackLooters: /^(0|1)?$/,
        attackChangeTarget: /^(0|1)?$/,
        aggressiveAntiKS: /^(0|1)?$/,

        attackUpdateMonsterPos: /^(0|1)?$/,

        autoMoveOnDeath: /^(0|1)?$/,
        autoMoveOnDeath_x: /^(\d{1,3})?$/,
        autoMoveOnDeath_y: /^(\d{1,3})?$/,
        autoMoveOnDeath_map: /^[a-z_@0-9]*$/,

        attackEquip_topHead: /.*/,
        attackEquip_midHead: /.*/,
        attackEquip_lowHead: /.*/,
        attackEquip_leftHand: /.*/,
        attackEquip_rightHand: /.*/,
        attackEquip_leftAccessory: /.*/,
        attackEquip_rightAccessory: /.*/,
        attackEquip_robe: /.*/,
        attackEquip_armor: /.*/,
        attackEquip_shoes: /.*/,
        attackEquip_arrow: /.*/,
        attackEquip_costumeTopHead: /.*/,
        attackEquip_costumeMidHead: /.*/,
        attackEquip_costumeLowHead: /.*/,
        attackEquip_shadowLeftHand: /.*/,
        attackEquip_shadowRightHand: /.*/,
        attackEquip_shadowLeftAccessory: /.*/,
        attackEquip_shadowRightAccessory: /.*/,
        attackEquip_costumeRobe: /.*/,
        attackEquip_shadowArmor: /.*/,
        attackEquip_shadowShoes: /.*/,
        attackEquip_costumeFloor: /.*/
    };

    blocks = {
        autoBreakTime: {
            keys: {
                startTime: /^((([0,1][0-9])|(2[0-3])):[0-5][0-9])?$/,
                stopTime: /^((([0,1][0-9])|(2[0-3])):[0-5][0-9])?$/,
                disabled: /^(0|1)?$/
            }
        },
        autoConfChange: {
            keys: {
                minTime: /^((([0,1][0-9])|(2[0-3])):[0-5][0-9])?$/,
                varTime: /^((([0,1][0-9])|(2[0-3])):[0-5][0-9])?$/,
                lvl: /^\d*$/,
                joblvl: /^\d*$/
            }
        },
        monsterSkill: {
            keys: {}
        }
    };
}

module.exports = config;
