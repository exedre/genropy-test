#!/usr/bin/python
# -*- coding: utf-8 -*-

from gnr.web.gnrbaseclasses import BaseComponent
from gnr.core.gnrdecorator import public_method

class View(BaseComponent):

    def th_struct(self,struct):
        r = struct.view().rows()
        r.fieldcell('ragione_sociale')
        r.fieldcell('indirizzo')
        r.fieldcell('provincia')
        r.fieldcell('comune')

    def th_order(self):
        return 'ragione_sociale'

    def th_query(self):
        return dict(column='ragione_sociale', op='contains', val='')



class Form(BaseComponent):

    def th_form(self, form):
        pane = form.record
        fb = pane.formbuilder(cols=2, border_spacing='4px')
        fb.field('ragione_sociale')
        fb.field('indirizzo')
        fb.field('provincia')
        fb.field('comune',condition='$sigla_provincia=:provincia',condition_provincia='^.provincia')


    def th_options(self):
        return dict(dialog_height='400px', dialog_width='600px')
