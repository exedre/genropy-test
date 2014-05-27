#! python
# encoding: utf-8

class Table(object):
    def config_db(self,pkg):
        tbl = pkg.table('cliente',pkey='id',name_long='!!Cliente',name_plural='!!Clienti',caption_field='ragione_sociale')
        self.sysFields(tbl)
        tbl.column('ragione_sociale',name_long='!!Ragione sociale',name_short='Rag. Soc.')
        tbl.column('indirizzo',name_long='!!Indirizzo')
        tbl.column('provincia',size='2',name_long='!!Provincia',name_short='Pr.').relation('glbl.provincia.sigla',relation_name='clienti',mode='foreignkey')
        tbl.column('comune',size='22',group='_',name_long='!!Comune').relation('glbl.comune.id',relation_name='clienti',mode='foreignkey',onDelete='raise')
        
        
