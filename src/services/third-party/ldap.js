const ldap = require('ldapjs')

// FIXME: not working yet

const LdapService = {
  urlLdapParama: process.env.LDAP_PARAMA_URL,
  urlLdapParagon: process.env.LDAP_PARAGON_URL,
  dnParama: process.env.LDAP_PARAMA_DN,
  dnParagon: process.env.LDAP_PARAGON_DN,

  async checkPassword (email, password) {
    if (email.includes('@pti-cosmetics.com')) {
      const uid = email.replace('@pti-cosmetics.com', '')
      const clientParagon = ldap.createClient({
        url: [LdapService.urlLdapParagon],
        timeout: 500,
        connectTimeout: 500,
        reconnect: false
      })
      const ldapResult = await LdapService.checkPasswordLdap(
        clientParagon,
        uid,
        password,
        LdapService.dnParagon
      )
      if (!ldapResult) return false
    } else if (email.includes('@paramaglobalinspira.com')) {
      const uid = email.replace('@paramaglobalinspira.com', '')
      const clientParama = ldap.createClient({
        url: [LdapService.urlLdapParama],
        timeout: 500,
        connectTimeout: 500,
        reconnect: false
      })
      const ldapResult = await LdapService.checkPasswordLdap(
        clientParama,
        uid,
        password,
        LdapService.dnParama
      )
      if (!ldapResult) return false
    } else {
      // invalid email
      return false
    }

    return true
  },

  checkPasswordLdap (client, uid, password, dn) {
    return new Promise((resolve) => {
      const account = `uid=${uid},${dn}`
      client.on('error', () => {
        resolve(false)
      })
      client.bind(account, password, (err, res) => {
        client.unbind()

        if (err) {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    })
  }
}

module.exports = LdapService
