#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
import unicodedata
import os
import json
from StringIO import StringIO

from pdfminer.pdfinterp import PDFResourceManager, PDFPageInterpreter
from pdfminer.converter import TextConverter
from pdfminer.layout import LAParams
from pdfminer.pdfpage import PDFPage
from slugify import slugify


def build_database():
    rsrcmgr = PDFResourceManager()
    codec = 'utf-8'
    laparams = LAParams()
    path = os.path.join(os.path.abspath('.'), 'songbook.pdf')
    fp = open(path, 'rb')
    pagenos = set()
    pages = PDFPage.get_pages(fp, pagenos)
    not_found = 0
    data = []
    slugs = []
    for i, page in enumerate(pages, start=1):
        # skipping table of contents and blank pages
        if i <= 8 or i == 112 or i == 123:
            continue

        retstr = StringIO()
        print '\n\nProcessing Page {}'.format(i)
        device = TextConverter(rsrcmgr, retstr, codec=codec, laparams=laparams)
        interpreter = PDFPageInterpreter(rsrcmgr, device)
        interpreter.process_page(page)

        text = retstr.getvalue()
        stripped = map(str.strip, text.split('\n'))

        # special cases
        if i == 38:
            title = stripped[2].decode('utf-8')
            text = '\n'.join(stripped[5:])
        elif i == 64:
            title = stripped[4].decode('utf-8')
        elif i == 55:
            # append to previous page
            data[len(data) - 1]['text'] += text
            continue
        elif i == 67:
            title = stripped[2].decode('utf-8')
            text = '\n'.join(stripped[5:])
        elif i == 75:
            data[len(data) - 1]['text'] += text
            continue
        else:
            title = stripped[0].decode('utf-8')

        slug = slugify(title)
        if slug in slugs:
            slug = '{}_1'.format(slug)
        slugs.append(slug)
        print u'Adding {} - slug: {}'.format(title, slug)
        data.append({
            'title': title,
            'text': text,
            'slug': slug,
        })
    retstr.close()
    device.close()
    fp.close()

    with open('../src/imports/songs.json', 'w') as f:
        f.write(json.dumps(data))

    print 'File saved!'

if __name__ == "__main__":
    build_database()
