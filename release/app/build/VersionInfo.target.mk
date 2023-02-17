# This file is generated by gyp; do not edit.

TOOLSET := target
TARGET := VersionInfo
### Rules for final target.
LDFLAGS_Debug := \
	-pthread \
	-rdynamic \
	-m64

LDFLAGS_Release := \
	-pthread \
	-rdynamic \
	-m64

LIBS :=

$(obj).target/VersionInfo.node: GYP_LDFLAGS := $(LDFLAGS_$(BUILDTYPE))
$(obj).target/VersionInfo.node: LIBS := $(LIBS)
$(obj).target/VersionInfo.node: TOOLSET := $(TOOLSET)
$(obj).target/VersionInfo.node:  FORCE_DO_CMD
	$(call do_cmd,solink_module)

all_deps += $(obj).target/VersionInfo.node
# Add target alias
.PHONY: VersionInfo
VersionInfo: $(builddir)/VersionInfo.node

# Copy this to the executable output path.
$(builddir)/VersionInfo.node: TOOLSET := $(TOOLSET)
$(builddir)/VersionInfo.node: $(obj).target/VersionInfo.node FORCE_DO_CMD
	$(call do_cmd,copy)

all_deps += $(builddir)/VersionInfo.node
# Short alias for building this executable.
.PHONY: VersionInfo.node
VersionInfo.node: $(obj).target/VersionInfo.node $(builddir)/VersionInfo.node

# Add executable to "all" target.
.PHONY: all
all: $(builddir)/VersionInfo.node

