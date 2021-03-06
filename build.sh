#!/bin/sh

VERSION=`cat VERSION`
if [ "x$RELEASE" = "x" ]
then
    RELEASE=unknown
fi

RPMBUILD=`mktemp -d`

mkdir -p $RPMBUILD/SPECS
mkdir -p $RPMBUILD/SOURCES
mkdir -p $RPMBUILD/BUILD
mkdir -p $RPMBUILD/BUILDROOT
mkdir -p $RPMBUILD/RPMS
mkdir -p $RPMBUILD/SRPMS

git archive --format=tar.gz HEAD --prefix=oneir-ui-dev/ > $RPMBUILD/SOURCES/oneir-ui-dev.tar.gz

rpmbuild -ba --define "release $RELEASE" --define "version $VERSION" --define "_topdir $RPMBUILD" ./oneir-ui.spec

RPMS=`find $RPMBUILD -name "*.rpm"`
cp $RPMS .

rm -rf $RPMBUILD
